// email store string null=false
// password store string null=false

// const { mapOptionFieldNames } = require("sequelize/types/lib/utils");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        email:{
            type: DataTypes.STRING, 
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return User;
};

