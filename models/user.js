// email as STRING, null = false
// pasSword as STRING, null = false

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return User;
}


//  DATA MODEL MUST HAVE USERNAME.STRING AND PASSWORDHASH.STRING