const { DataTypes, Model } = require('sequelize')

class User extends Model {
    /** @type {number} */
    userid;
}

module.exports = { initModel(sequelize) {
    User.init({
        userid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, { sequelize });
}}