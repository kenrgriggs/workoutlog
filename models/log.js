
// LOG MODEL MUST HAVE THE PROPERTIES: 
// description.STRING
// definition.STRING
// result.STRING
// owner_id.STRING

module.exports = (sequelize, DataTypes) => {
    let Log = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        definition:  {
            type: DataTypes.STRING,
            allowNull: false
        },
        result:  {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id:  {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Log;
}