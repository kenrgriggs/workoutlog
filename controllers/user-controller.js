let express = require("express");
let router = express.Router();

let validateSession = require("../middleware/validate-session");

let sequelize = require("../db");
let User = sequelize.import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const router = require('express').Router();
// const User = require("../db").import("../models/user.js");

// router.get("/user", function (req, res) {

// });

router.post("/register", function (req, res) {
  let email = req.body.user.email;
  let password = req.body.user.password;

  let userModel = {
    email: email,
    password: bcrypt.hashSync(password, 13),
  };

  User.create(userModel)
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      let responseObject = {
        user: user,
        sessionToken: token,
      };
      res.json(responseObject);
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.post("/login", validateSession, function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });

              res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed." });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User does not exist." });
      }
    })

    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

// // THESE ARE ASSIGNMENT ROUTES

// router.post("/register", validateSession, function (req, res) {
//   let responseObject = {
//     message: "This is a placeholder for the user/register endpoint.",
//   };
//   res.json(responseObject);
// });

// router.post("/login", validateSession, function (req, res) {
//   let responseObject = {
//     message: "This is a placeholder for the user/login endpoint.",
//   };
//   res.json(responseObject);
// });

module.exports = router;
