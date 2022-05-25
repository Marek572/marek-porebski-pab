const express = require('express')
const router = express.Router()
const GameModel = require('../models/GameModel')
const GenreModel = require('../models/GenreModel')
const PublisherModel = require('../models/PublisherModel')
import { gameValidation } from '../validation'
import { genreValidation } from '../validation'
import { publisherValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req, res, next)
})


//GET all games
router.get('/', async (req, res) => {

    //find games
    const allGames = await GameModel.find()

    //output
    if (allGames.length > 0)
        return res.send(allGames)
    else
        return res.status(404).send("Game list is empty") //ok but no content

})

//GET all games of specific genre
router.get('/genre/:genreName', async (req, res) => {

    //find games
    const genre = req.params.genreName
    const genreSpace = genre.replace('_', ' ')
    const genreGames = await GameModel.find({ genres: genreSpace })

    //output
    if (genreGames.length > 0)
        return res.send(genreGames)
    else
        return res.status(404).send("Games with genre " + genre + " not found")
})

//GET all games from specific developer
router.get('/developer/:devName', async (req, res) => {

    //find games
    const devName = req.params.devName
    const devNameSpace = devName.replace('_', ' ')
    const devGames = await GameModel.find({ developer: devNameSpace })

    //output
    if (devGames.length > 0)
        return res.send(devGames)
    else
        return res.status(404).send("This developer have no games")

})

//GET single game by id
router.get('/game/:id', async (req, res) => {

    //find game
    const id = req.params.id
    const idGame = await GameModel.findOne({ _id: id })

    //output
    if (idGame)
        return res.send(idGame)
    else
        return res.status(404).send("Game with id " + id + " not found")

})

//GET single game by title
router.get('/game/title/:title', async (req, res) => {

    //find game
    const title = req.params.title
    // const titleSpace = title.replace('_', ' ')
    const game = await GameModel.findOne({ title: title })

    //output
    if (game)
        return res.send(game)
    else
        return res.status(404).send("Game with title " + title + " not found")

})

//TODO: POST add few games

//POST add game
router.post('/game', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //game validation
    const { error } = gameValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //new game
    const { title, genres, developer, publisher, releseDate } = req.body

    //add new genres
    for(let i=0; i<genres.length; i++) {
        //genre validation
        const { error } = genreValidation({genName: genres[i]})
        if (!error){
            genres[i] = genres[i].toLowerCase()
            const genreExists = await GenreModel.findOne({genName: genres[i]})
            if(!genreExists){
                const newGenre = new GenreModel({
                    genName: genres[i],
                })
                await newGenre.save()
            }
        }else{
            const index = genres.indexOf(genres[i])
            genres.splice(index, 1)
        }
    }

    //add new publishers
    for(let i=0; i<publisher.length; i++) {
        //publisher validation
        const { error } = publisherValidation({pubName: publisher[i]})
        if (!error){
            publisher[i] = publisher[i].toLowerCase()
            const publisherExists = await PublisherModel.findOne({pubName: publisher[i]})
            if(!publisherExists){
                const newPublisher = new PublisherModel({
                    pubName: publisher[i],
                })
                await newPublisher.save()
            }
        }else{
            const index = publisher.indexOf(publisher[i])
            publisher.splice(index, 1)
        }
    }

    const newGame = new GameModel({
        title: title.toLowerCase(),
        genres: genres,
        developer: developer.toLowerCase(),
        publisher: publisher,
        releseDate: releseDate
    })

    //check if game exsist
    const game = await GameModel.findOne({ title: title.toLowerCase() })
    if (game)
        return res.status(400).send('Game with title ' + title + ' already exists')

    //save game
    try {
        const saveGame = await newGame.save()
        return res.status(201).send("You added new game: " + saveGame.title)
    } catch (err) {
        return res.status(400).send(err)
    }
})

//PUT edit specific game
router.put('/game/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find game
    const id = req.params.id
    let idGame = await GameModel.findOne({ _id: id })

    //check if game exist
    if (!idGame)
        return res.status(404).send("Game with id " + id + " does not exist")

    //update game
    try {
        const updateGame = await GameModel.updateOne({ _id: id }, req.body)
        return res.status(204).send("You edited game with id " + id) //no content
    } catch (err) {
        return res.status(400).send(err)
    }

})

//DELETE delete specific game
router.delete('/game/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find all game
    const id = req.params.id
    let idGame = await GameModel.findOne({ _id: id })

    //check if game exist
    if (!idGame)
        return res.status(404).send("Game with id " + id + " does not exist")

    //delete game
    try {
        const deleteGame = await GameModel.deleteOne({ _id: id })
        return res.status(204).send("You deleted game with id " + id) //no content
    } catch (err) {
        return res.status(400).send(err)
    }

})

export default router