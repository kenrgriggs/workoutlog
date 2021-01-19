let express = require('express'); 
let app = express(); 

const sequelize = require("./db");
let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');
let calculator = require('./controllers/calculatorcontroller');

// app.use("/test", function(request, response){
//     response.send("This is a message from the test endpoint on the server!");
// });

// app.use("/kenneth", function(request, response){
//     response.send("My name is Kenneth and I am 27 years old, i think.");
// });


// Have endpoint of journal/practice
// send a response from that endpoint (This is a practice route)

sequelize.sync();

app.use(express.json());
app.use('/journal', journal);

app.use('/user', user);

app.use('/calculator', calculator);

app.listen(3000, function() {
    console.log("App is listening on port 3000.");
});

// localhost:3000

// localhost:3000/test