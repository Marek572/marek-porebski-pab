const express = require('express')
const router = express.Router()
import { readStorage, updateStorage, genres} from '../storage'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req,res,next)
    next()
})

export interface Genre{
    id: number,
    genName: string
}

readStorage()

//GET all genres
router.get('/', (req,res) => {

    //output
    if(genres.length>0)
        res.status(200).send(genres)
    else
        res.status(404).send("genre list is empty")

})

//GET single genre by id
router.get('/genre/:id', (req, res) => {

    const id = +req.params.id
    const tmp = genres.find(genre => genre.id == id)

    //output
    if(tmp !== undefined)
        res.status(200).send(tmp)
    else
        res.status(404).send("genre with id " + id + " not found")

})


//FIXME: post,put,delete require admin privileges
//TODO: POST add few genres

//POST add single genre
router.post('/genre', (req, res) => {

    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newGenre: Genre = {
        id: id,
        genName: req.body.genName
    }

    //output
    if(newGenre !== undefined) {
        if(!genres.find(genre => genre.id == newGenre.id)){
            genres.push(newGenre)
            updateStorage()
            res.status(201).send("You added new genre: " + newGenre.genName)
        }
        else
            res.status(400).send("genre with id " + id + " already exist")
    }
    else
        res.status(400).send("wrong construction of newGenre")

})

//PUT edit specific genre
router.put('/genre/:id', (req, res) => {

    const id = +req.params.id

    console.log(genres.find(genre => genre.id == id))

    //output
    if(genres.find(genre => genre.id == id) !== undefined){
        genres[id] = req.body
        updateStorage()
        res.status(200).send("You edited genre with id " + id)
    }
    else
        res.status(404).send("genre with id " + id + " does not exist")

})

//DELETE delete specific game
router.delete('/genre/:id', (req, res) => {

    const id = +req.params.id

    //output
    if(genres.find(game => game.id == id) !== undefined){
        res.status(200).send("You deleted genre with id " + id)
        genres.splice(genres.findIndex(genre => genre.id == id), 1)
        updateStorage()
    }
    else
        res.status(404).send("genre with id " + id + " does not exist")

})

export default router



//NOTES:
//FIXME: zastanowic sie czy na pewno szukac wszystkiego po id a nie po nazwach gatunkow
//FIXME: toLowerCase() przy zapisie (raczej storage.ts przy JSON.stringify, CHYBA)?

