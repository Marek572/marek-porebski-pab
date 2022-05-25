const express = require('express')
const router = express.Router()
const CollectionModel = require('../models/CollectionModel')
import { beatenValidation, /*collectionValidation,*/ plannedValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req, res, next)
})


//GET all collections
router.get('/', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find all collections
    const allCollections = await CollectionModel.find()

    //output
    if (allCollections.length > 0)
        return res.send(allCollections);
    else
        return res.status(404).send('Collections is empty')

})

//GET single (public) collection
router.get('/collection/:username', async (req, res) => {

    const currentUser = res.locals.verified.username

    //find user collection
    const username = req.params.username
    const userCollection = await CollectionModel.findOne({ username: username })

    //output
    if (currentUser === 'admin')
            return res.send(userCollection)

    if (userCollection) {
        if (userCollection.visible === true)
            return res.send(userCollection)
        else
            return res.status(400).send(username + " have private collection")
    }
    else
        return res.status(404).send(username + " collection not found")

})

//GET current user collection
router.get('/collection', async (req, res) => {

    //find currentUser collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser })

    //output
    if (currentUserCollection)
        return res.send(currentUserCollection)
    else
        return res.status(400).send('Something went wrong')

})

//PUT edit visability
router.put('/colletion', async (req, res) => {

    //find currentUser collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser })

    let visability = currentUserCollection.visible

    //output
    if (currentUserCollection) {
        if (visability === true) {
            visability = false
            return res.send("Your collection is now private")
        } else {
            visability = true
            return res.send("Your collection is now public")
        }
    }
    else
        return res.status(400).send('Something went wrong')

})

//Bez delete'a kolekcji, bo stworzona na stale; ewentualne usuwanie przy usunieciu konta

//POST add beaten game
router.post('/collection/beaten', async (req, res) => {

    //find currentUser collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser })

    //output
    if (currentUserCollection) {

        //beaten validation
        const { error } = beatenValidation(req.body)
        console.log(error)
        if (error)
            return res.status(400).send(error.details[0].message)

        //beaten game data
        const newItem = req.body.beaten
        let beatenGames = currentUserCollection.beaten

        //check if already beaten
        const checkBeaten = beatenGames.includes(newItem)
        if (checkBeaten)
            return res.status(400).send('You already beaten that game')

        //push game beaten
        beatenGames.push(newItem)

        //save beaten
        try {
            const saveBeaten = await currentUserCollection.save()
            return res.send('You added new beaten game: ' + newItem)
        } catch (err) {
            return res.status(400).send(err)
        }

    } else
        return res.status(400).send('Something went wrong')

})

//POST add planned game
router.post('/collection/planned', async (req, res) => {

    //find currentUser collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser })

    //output
    if (currentUserCollection) {

        //planned validation
        const { error } = plannedValidation(req.body)
        console.log(error)
        if (error)
            return res.status(400).send(error.details[0].message)

        //planned game data
        const newItem = req.body.planned
        let plannedGames = currentUserCollection.planned

        //check if already planned
        const checkPlanned = plannedGames.includes(newItem)
        if (checkPlanned)
            return res.status(400).send('You already planned that game')

        //push game to planned
        plannedGames.push(newItem)

        //save planned
        try {
            const savePlanned = await currentUserCollection.save()
            return res.send('You added new planned game: ' + newItem)
        } catch (err) {
            return res.status(400).send(err)
        }

    } else
        return res.status(400).send('Something went wrong')

})

//DELETE beaten game
router.delete('/collection/beaten', async (req, res) => {

    //find user collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser })

    //output
    if (currentUserCollection) {

        //beaten game data
        const delItem = req.body.beaten
        let beatenGames = currentUserCollection.beaten

        //check if already planned
        const checkBeaten = beatenGames.includes(delItem)
        if (!checkBeaten)
            return res.status(400).send('Beaten games does not contain: ' + delItem)

        //delate game from beaten
        const index = beatenGames.indexOf(delItem)
        beatenGames.splice(index, 1)

        //save beaten
        try {
            const deleteBeaten = await currentUserCollection.save()
            return res.send('You deleted beaten game: ' + delItem)
        } catch (err) {
            return res.status(400).send(err)
        }

    } else
        return res.status(400).send('Something went wrong')

})

//DELETE planned game
router.delete('/collection/planned', async (req, res) => {

    //find user collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser })

    //output
    if (currentUserCollection) {

        const delItem = req.body.planned
        let plannedGames = currentUserCollection.planned

        //check if already planned
        const checkPlanned = plannedGames.includes(delItem)
        if (!checkPlanned)
            return res.status(400).send('Beaten games does not contain game: ' + delItem)

        //delate game from planned
        const index = plannedGames.indexOf(delItem)
        plannedGames.splice(index, 1)

        //save planned
        try {
            const deletePlanned = await currentUserCollection.save()
            return res.send('You deleted beaten game: ' + delItem)
        } catch (err) {
            return res.status(400).send(err)
        }

    } else
        return res.status(400).send('Something went wrong')

})

export default router

//NOTES
//FIXME: VALIDATION