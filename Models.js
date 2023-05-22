

const Board = require("./Board.model")
const Cheese = require("./Cheese.model")
const  db  = require("./db")
const User = require("./User.model")


// User.hasMany(Board)
// Board.belongsTo(User)
User.hasMany(Board)
Board.belongsTo(User)

Board.belongsToMany(Cheese, {through:  "Board_Cheese" })
Cheese.belongsToMany(Board, {through:  "Board_Cheese" })

module.exports = {
    Board, 
    Cheese, 
    User
}