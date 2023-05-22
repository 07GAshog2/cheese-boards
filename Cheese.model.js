const { Model, DataTypes } = require("sequelize")
const db = require("./db")

class Cheese extends Model { }

Cheese.init({
    title: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    }
},   {sequelize: db})

module.exports = Cheese