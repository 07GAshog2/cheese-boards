const {Board, Cheese, User} = require("./Models")
const  db  = require("./db")


async function seed() {
    await db.sync({force: true})

    cheeses = await Cheese.bulkCreate([
        {title: "String Cheese", description: "Cheesy"},
        {title: "Swiss cheese", description: "more cheese = more hole; more hole = less cheese: more cheese = less cheese"},
        {title: "Grilled Cheese", description: "The best type"}
    ])

    boards = await Board.bulkCreate([
        {type: "Board",  description: "Woody board",rating: " 5"},
        {type: "Glass Board", description: "See through",rating: " 7"},
        {type: "Plastic Board", description: "Oceans worst enemy",rating: " 3"}
    ])

    await boards[0].addCheese(cheeses[0])
    await cheeses[1].addBoard(boards[2])
    await boards[1].addCheeses(cheeses)

    const everBoardFromCheese = await Cheese.findAll({include: Board})
    
}

seed()

// console.log(JSON.stringify(allBoards, null, 2));