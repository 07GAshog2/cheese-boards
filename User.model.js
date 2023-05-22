const { Model, DataTypes } = require("sequelize")
const db = require("./db")

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},   {sequelize: db})


module.exports = User
// Planet.init({
//     name: {
//         type: DataTypes.TEXT
//     },
//     moons: {
//         type: DataTypes.INTEGER
//     },
//     mass: {
//         type: DataTypes.REAL
//     }
// }, {sequelize: db})