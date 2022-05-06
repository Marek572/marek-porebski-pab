const express = require('express')
const router = express.Router()
import { readStorage, updateStorage, publishers} from './storage'

router.use((req, res, next) => {
    next()
})

export interface Publisher {
    id?: number,
    pubName: string,
}

readStorage()

//GET all publishers
router.get('/', (req, res) => {

    //output
    if(publishers.length>0)
        res.status(200).send(publishers)
    else
        res.status(404).send("publisher list is empty")

})

//GET single publisher by id
router.get('/publisher/:id', (req, res) =>{

    const id = +req.params.id

    //output
    if(publishers.find(publisher => publisher.id ==id) !== undefined)
        res.status(200).send(publishers.find(publisher => publisher.id))
    else
        res.status(404).send("publisher with id " + id + " not found")

})


//FIXME: post,put,delete require admin privileges
//TODO: POST add few publishers

//POST add publisher
router.post('/publisher', (req, res) => {

    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newPublisher: Publisher = {
        id: id,
        pubName: req.body.pubName,
    }

    //TODO: czy potrzeba dodawania tagow przez dodawanie gry?

    //output
    if(newPublisher !== undefined){
        if(!publishers.find(publisher => publisher.id === newPublisher.id)){
            publishers.push(newPublisher)
            updateStorage()
            res.status(201).send("You added new publisher: " + newPublisher.pubName)
        }
        else
            res.status(400).send("publisher with id " + id + " already exist")
    }
    else
        res.status(400).send("wrong construction of newPublisher")

})

//PUT edit specific publisher
router.put('/publisher/:id', (req, res) => {

    const id = +req.params.id

    //output
    if(publishers.find(publisher => publisher.id == id) !== undefined){
        publishers[id] = req.body
        updateStorage()
        res.status(200).send("You edited publisher with id " + id)
    }
    else
        res.status(404).send("publisher with id " + id + " does not exist")

})

//DELETE delete specific game
router.delete('/publisher/:id', (req, res) => {

    const id = +req.params.id

    //output
    if(publishers.find(publisher => publisher.id == id) !== undefined){
        res.status(200).send("You deleted publisher with id " + id)
        publishers.splice(publishers.findIndex(publisher => publisher.id == id), 1)
        updateStorage()
    }
    else
        res.status(404).send("publisher with id " + id + " does not exist")

})

export default router


//NOTES:
//FIXME: toLowerCase() przy zapisie (raczej storage.ts przy JSON.stringify, CHYBA)?