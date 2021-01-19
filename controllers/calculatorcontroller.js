let express = require('express');
let router = express.Router();

router.post('/add', function (req, res) {

    let num1 = req.body.number1;
    let num2 = req.body.number2;

    let sum = num1+num2;

    let obj = { total: num1 + num2 };

    res.json(`${num1} + ${num2} = ${sum}`);

})

module.exports = router;

