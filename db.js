const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutdb', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

// i added some comments here to test if this file was truly being ignored. 

// adding more comments again

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully,");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

    module.exports = sequelize;
    