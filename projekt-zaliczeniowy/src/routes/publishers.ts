const express = require('express')
const router = express.Router()
const PublisherModel = require('../models/PublisherModel')
import { publisherValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req, res, next)
})


//GET all publishers
router.get('/', async (req, res) => {

    //find games
    const allPublishers = await PublisherModel.find()

    //output
    if (allPublishers.length > 0)
        return res.send(allPublishers)
    else
        return res.status(404).send("Publisher list is empty")

})

//GET single publisher by id
router.get('/publisher/:id', async (req, res) => {

    //find publisher
    const id = req.params.id
    const idPublisher = await PublisherModel.findOne({ _id: id })

    //output
    if (idPublisher)
        return res.send(idPublisher)
    else
        return res.status(404).send("Publisher with id " + id + " not found")

})

//TODO: POST add few publishers

//POST add publisher
router.post('/publisher', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //validation
    const { error } = publisherValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //new publisher
    const { pubName } = req.body
    const newPublisher = new PublisherModel({
        pubName: pubName
    })

    //check if publisher exsist
    const publisher = await PublisherModel.findOne({ pubName: pubName })
    if (publisher)
        return res.status(400).send("Publisher with name " + pubName + " already exist")

    //save publisher
    try {
        const savePublisher = await newPublisher.save()
        return res.status(201).send("You added new publisher: " + newPublisher.pubName)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//PUT edit specific publisher
router.put('/publisher/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find publisher
    const id = req.params.id
    const idPublisher = await PublisherModel.findOne({ _id: id })

    //check if publisher exist
    if (!idPublisher)
        return res.status(404).send("Publisher with id " + id + " does not exist")

    //update publisher
    try {
        const updatePublisher = await PublisherModel.updateOne({ _id: id }, req.body)
        return res.status(204).send("You edited publisher with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//DELETE delete specific game
router.delete('/publisher/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find publisher
    const id = req.params.id
    const idPublisher = await PublisherModel.findOne({ _id: id })

    //check if publisher exist
    if (!idPublisher)
        return res.status(404).send("Publisher with id " + id + " does not exist")

    //delete publisher
    try {
        const deletePublisher = await PublisherModel.deleteOne({ _id: id })
        return res.status(204).send("You deleted publisher with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

export default router