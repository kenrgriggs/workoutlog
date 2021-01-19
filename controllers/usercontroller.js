const { response } = require('express');
let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user.js');


// shorter version of above
// const router = require('express').Router();
// const User = require("../db").import("../models/user.js");

router.post('/create', function(req, res) {

    let userModel = {
        email: req.body.user.email, 
        password: req.body.user.password,
    };
    User.create(userModel).then(function(user) {
            let responseObject = {
                user: user
            };
            res.json(responseObject);
        })
        .catch(function(err){
            res.status(500).json({error: err})
        });
});

module.exports = router;

