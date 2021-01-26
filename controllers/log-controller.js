let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-session");

let Log = require("../db").import("../models/log");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/practice", validateSession, function (req, res) {
  res.send("this is a practice route!");
});

router.get("/about", function (req, res) {
  res.send("this is the about route!");
});


// #################################
// ### ACTUAL ASSIGNMENT ROUTES ####
// #################################


// ALLOWS USERS TO CREATE A WORKOUT LOG WITH DESCRIPTIONS, DEFINITIONS, RESULTS, AND OWNER PROPERTIES 

router.post("/", validateSession, function (req, res) {
  let description = req.body.log.description;
  let definition = req.body.log.definition;
  let result = req.body.log.result;
  let owner_id = req.body.log.owner_id;

  let logEntry = {
    description: description,
    definition: definition,
    result: result,
    owner_id: owner_id,
  };

  Log.create(logEntry)
    .then(function createSuccess(log) {
      let token = jwt.sign({ id: log.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      let responseObject = {
        log: log,
        sessionToken: token,
      };
      res.json(responseObject);
    })
    .catch(function (err) {
      res.status(509).json({ error: err });
    });
});



// GETS ALL LOGS FOR AN INDIVIDUAL USER

router.get('/', validateSession, function (req, res) {

    Log.findAll()
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))
});



// GETS INDIVIDUAL LOGS BY ID FOR AN INDIVIDUAL USER

router.get('/:id', function (req, res) {
let id = req.params.id;

    Log.findAll({
        where: { id: id }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }))

    // res.send("These is a placeholder get-id route for the Workout Log Assignment.");
});



// ALLOWS INDIVIDUAL LOGS TO BE UPDATED BY A USER

router.put('/:id', validateSession, function (req, res) {
  description = req.body.log.description ;
  let definition = req.body.log.definition;
  let result = req.body.log.result;
  let owner_id = req.body.log.owner_id;
  
  let updateLog = {
        description: description,
        definition: definition,
        result: result,
        owner_id: owner_id,
    };

    let query = { where: {id: req.params.id }};

    Log.update(updateLog, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err}));

    // res.send("These is a placeholder put-id route for the Workout Log Assignment.");
});



// ALLOWS INDIVIDUAL LOGS TO BE DELETED BY A USER

router.delete('/:id', validateSession, function (req, res) {
  let query = { where: { id: req.params.id }};

  Log.destroy(query)
  .then(() => res.status(200).json({ message: "Log entry removed." }))
  .catch((err) => res.status(500).json({ error: err }));


    // res.send("These is a placeholder delete-id route for the Workout Log Assignment.");
});

module.exports = router;
