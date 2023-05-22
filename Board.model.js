const { Model, DataTypes } = require("sequelize")
const db = require("./db")

class Board extends Model{}
//A board is what holds the cheese, literally
Board.init({
    type: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },
    rating: {
        type: DataTypes.INTEGER
    }
},   {sequelize: db})
module.exports = Board