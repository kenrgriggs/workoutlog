require("dotenv").config();
let express = require('express'); 
let app = express(); 
let sequelize = require("./db");
let user = require('./controllers/usercontroller');
let journal = require('./controllers/journalcontroller');
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

app.use(require('./middleware/headers'));

// Hey all. So I’ve been having a CORS issue when trying to post a journal entry. In the event someone has this issue as well, I thought I’d put the solution here for y’all, so you don’t have to turn off cors. So if you see the error in the image that I attached, what’s happening is a 403 error. You can find out the type by going into the Network tab on your dev tools. Basically the server is getting the request, checking for headers, and finding OPTIONS is screwy, and denying the POST request. So, we need to tell the server “Make OPTIONS be ‘ok’“. Here is the code to do that:
// ** this code goes into your app.js on the server side, make sure it goes under where you require/import your middleware headers.
//  All OPTIONS requests return a simple status: 'OK'

app.options('*', (req, res) => {
    res.json({
      status: 'OK'
    });
  });
  
// Here is the Stackoverflow where I got the answer from, it will probably explain this better than I can. https://stackoverflow.com/a/50064979 (edited) 

app.use(express.json());

app.use('/user', user);

app.use(require('./middleware/validate-session'));
app.use('/journal', journal);

app.listen(3000, function() {
    console.log("App is listening on port 3000.");
});
