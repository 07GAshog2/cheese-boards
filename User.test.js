const {Board, Cheese, User} = require("./Models")
const  db  = require("./db")

describe("Testing if User db works", () => {
    test("Testing if user can be created", async () => {
        await db.sync({force: true})
        await User.create({
            name: "Gabriel",
            email: "gabriel@outlook.com"
        })
        user1 = await User.findByPk(1)
        expect(user1.id).toBe(1)
    })

    test("User has a one to many relationship", async () => {
        await db.sync({force: true})
        const user1 = await User.create({
            name: "Gabriel",
            email: "gabriel@outlook.com"
        })
        const board1 = await Board.create({
            type: "Board",
            description: "Woody board",
            rating: " 5"
        })
    
        const board2 = await Board.create({
            type: "glass",
            description: "See through",
            rating: "6"
        })
    
        await user1.addBoard(board1)
        await user1.addBoard(board2)
    
        allBoards = await user1.getBoards()
    
        expect(allBoards.length).toBe(2)
    })


    test("Testing for many to many relationship between cheese and board", async () => {
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

        cheeseBoard = await boards[1].getCheeses()

        expect(cheeseBoard.length).toBe(3)
    })

    test("Testing for many to many relationship between cheese and board version 2", async () => {
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

        cheeseBoard = await boards[0].getCheeses()

        expect(cheeseBoard.length).toBe(1)
    })

    test("Testing if Board is loading properly with eager loading", async () => {
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
    
        const everyCheeseFromBoard = await Board.findAll({include: Cheese})
        
        expect(everyCheeseFromBoard[1].Cheeses[2].id).toBe(3)
    })
    
    test("Testing if User is loading properly with eager loading", async () => {
        await db.sync({force: true})
        const user1 = await User.create({
            name: "Gabriel",
            email: "gabriel@outlook.com"
        })
        const board1 = await Board.create({
            type: "Board",
            description: "Woody board",
            rating: " 5"
        })
    
        const board2 = await Board.create({
            type: "glass",
            description: "See through",
            rating: "6"
        })
    
        await user1.addBoard(board1)
        await user1.addBoard(board2)
    
        const allBoardsFromUser = await User.findAll({include: Board})
        
        expect(allBoardsFromUser[0].Boards[0].id).toBe(1)
    })

    test("Testing if Cheese is loading properly with eager loading", async () => {
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
        
        expect(everBoardFromCheese[1].Boards[1].type).toBe("Glass Board")
    })        
})
// npm run test 