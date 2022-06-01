const express = require('express')
const router = express.Router()
const GenreModel = require('../models/GenreModel')
import { genreValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req, res, next)
})


//GET all genres
router.get('/', async (req, res) => {

    //find genres
    const allGenres = await GenreModel.find()

    //output
    if (allGenres.length > 0)
        return res.send(allGenres)
    else
        return res.status(404).send("Genre list is empty")

})

//GET single genre by id
router.get('/genre/:id', async (req, res) => {

    //find genre
    const id = req.params.id
    const idGenre = await GenreModel.findOne({ _id: id })

    //output
    if (idGenre)
        return res.send(idGenre)
    else
        return res.status(404).send("Genre with id " + id + " not found")

})

//TODO: POST add few genres

//POST add single genre
router.post('/genre', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //validation
    const { error } = genreValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //new genre
    const { genName } = req.body
    const newGenre = new GenreModel({
        genName: genName
    })

    //check if genre exsist
    const genre = await GenreModel.findOne({ genName: genName })
    if (genre)
        return res.status(400).send("Genre with name " + genName + " already exist")

    //save game
    try {
        const saveGenre = await newGenre.save()
        return res.status(201).send("You added new genre: " + saveGenre.genName)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//PUT edit specific genre
router.put('/genre/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find genre
    const id = req.params.id
    let idGenre = await GenreModel.findOne({ _id: id })

    //check if genre exsist
    if (!idGenre)
        return res.status(404).send("Genre with id " + id + " does not exist")

    //update game
    try {
        const updateGame = await GenreModel.updateOne({ _id: id }, req.body)
        return res.status(204).send("You edited genre with id " + id) //no content
    } catch (err) {
        return res.status(400).send(err)
    }

})

//DELETE delete specific game
router.delete('/genre/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find genre
    const id = req.params.id
    let idGenre = await GenreModel.findOne({ _id: id })

    //check if genre exsist
    if (!idGenre)
        return res.status(404).send("Genre with id " + id + " does not exist")

    //delete genre
    try {
        const deleteGenre = await GenreModel.deleteOne({ _id: id })
        return res.status(204).send("You deleted genre with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

export default router