const express = require('express')
const router = express.Router()
const GameModel = require('../models/GameModel')
import { gameValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req, res, next)
})


//GET all games
router.get('/', (req, res) => {

    //output
    // if (GameModel.length > 0)
    //     res.status(200).send(GameModel)
    // else
    //     res.status(404).send("game list is empty")

})

// //GET all games of specific genre
// router.get('/genre/:genreName', (req, res) => {

//     const genre = req.params.genreName
//     const genreGames = []

//     for(var i=0; i<games.length; i++) {
//         for(var j=0; j<games[i].genres.length; j++) {
//             if(games[i].genres[j] == genre)
//             genreGames.push(games[i])
//         }
//     }

//     //output
//     if(genreGames !== undefined)
//         res.status(200).send(genreGames)
//     else
//         res.status(404).send("games with genre " + genre+ " not found")
// })

// //GET all games from specific developer
// router.get('/developer/:devName', (req, res) => {

//     const devName = req.params.devName
//     const devNameSpace = devName.replace('_',' ')
//     const devGames = []

//     for(var i=0; i<games.length; i++) {
//         if(games[i].developer == devNameSpace)
//             devGames.push(games[i])
//     }

//     //output
//     if(devGames !== undefined)
//         res.status(200).send(devGames)
//     else
//         res.status(404).send("this developer have no games")
// })

// //GET single game by id
// router.get('/game/:id', (req, res) =>{

//     const id = +req.params.id
//     const tmp = games.find(game => game.id == id)

//     //output
//     if(tmp !== undefined)
//         res.status(200).send(tmp)
//     else
//         res.status(404).send("game with id " + id + " not found")

// })

// //GET single game by title
// router.get('/game/title/:title', (req, res) =>{

//     const title = req.params.title
//     const titleSpace = title.replace('_',' ')
//     const tmp = games.find(game => game.title == titleSpace)

//     //output
//     if(tmp !== undefined)
//         res.status(200).send(tmp)
//     else
//         res.status(404).send("game with title " + titleSpace + " not found")

// })


// //FIXME: post,put,delete require admin privileges
// //TODO: POST add few games

//POST add game
router.post('/game', async (req, res) => {

    //validation
    const { error } = gameValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const { title, genres, developer, publisher, releseDate } = req.body
    const newGame = new GameModel({
        title: title,
        genres: genres,
        developer: developer,
        publisher: publisher,
        releseDate: releseDate
    })

    //TODO: if gatunek nie istenieje usun go
    //TODO: ? gatunek jako obiekt a nie tablica stringow?

    //game check
    const game = await GameModel.findOne({ title: title })
    if (game) {
        return res.status(400).send('Game with title ' + title + ' already exists')
    }

    //save game
    try {
        const saveGame = await newGame.save()
        res.status(201).send("You added new game: " + saveGame.title)
    } catch (err) {
        res.status(400).send(err)
    }
})

// //PUT edit specific game
// router.put('/game/:id', (req, res) => {

//     const id = +req.params.id

//     //output
//     if(games.find(game => game.id == id) !== undefined){
//         games[id] = req.body
//         updateStorage()
//         res.status(200).send("You edited game with id " + id)
//     }
//     else
//         res.status(404).send("game with id " + id + " does not exist")

// })

// //DELETE delete specific game
// router.delete('/game/:id', (req, res) => {

//     const id = +req.params.id

//     //output
//     if(games.find(game => game.id == id) !== undefined){
//         res.status(200).send("You deleted game with id " + id)
//         games.splice(games.findIndex(game => game.id == id), 1)
//         updateStorage()
//     }
//     else
//         res.status(404).send("game with id " + id + " does not exist")

// })

export default router


//NOTES:
//FIXME: for loop dla genres wszedzie!
//FIXME: zastanowic sie czy na pewno szukac wszystkiego po id a nie po tytulach gier
//FIXME: toLowerCase() przy zapisie (raczej storage.ts przy JSON.stringify, CHYBA)?
//bez toLowerCase() wyszukiwanie po tytule utrudnione (case sensitive)