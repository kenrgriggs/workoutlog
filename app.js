require("dotenv").config();
let express = require('express');
let app = express();
const sequelize = require("./db");

let workoutlog = require('./controllers/log-controller');
let user = require('./controllers/user-controller');

sequelize.sync();

// app.use('/test', function(req,res) {
//     res.send("This is a message from the test endpoint on the server.")
// });

// app.use('/kenneth', function (req, res) {
//     res.send("My name is Kenneth");
// })

// Have endpoint of journal/practice
// Send a response from that endpoint (This is a practice route)

app.use(express.json());

app.use('/user', user);

app.use('/log', workoutlog);

app.listen(3000, function() {
    console.log("The app is running on port 3000.");
});

