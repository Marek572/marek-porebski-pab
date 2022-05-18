const express = require('express')
const router = express.Router()
const CollectionModel = require('../models/CollectionModel')
import { collectionValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req,res,next)
})


//GET all collections
router.get('/', async (req, res) => {

    const user = res.locals.verified.username
    if(user === 'admin'){
        //find collections
        const allCollections = await CollectionModel.find()

        //output
        if(allCollections.length>0)
            return res.send(allCollections);
        else
            return res.status(404).send('collections is empty')
    }else{
        return res.status(403).send('Access denied')
    }

})

//GET single public collection
router.get('/collection/:username', async (req, res) =>{

    //find user collection
    const username = req.params.username
    const userCollection = await CollectionModel.findOne({username: username})
    console.log(userCollection)

    //TODO: if admin privileges => skip checking if visable

    //output
    if(userCollection)
        if(userCollection.visible === true)
            return res.send(userCollection)
        else
            return res.status(404).send(username+" have private collection") //FIXME: not siur czy status 404
    else
        return res.status(404).send(username + " collection not found")

})

//GET current user collection
router.get('/collection', async (req, res) => {

    //find user collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser})

    //output
    if(currentUserCollection)
        return res.send(currentUserCollection)
    else
        return res.status(404).send('something went wrong')

})


//PUT edit visability
router.put('/colletion', async (req, res) => {

    //find user collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser})

    //output
    if(currentUserCollection){
        currentUserCollection.visible = true
        return res.send("You edited viability of your collection")
    }
    else
        return res.status(400).send("You can only edit your collection") //FIXME: nwm jaki status, czy dobry send?

})

//Bez delete'a kolekcji, bo stworzona na stale; ewentualne usuwanie przy usunieciu konta

//POST add beaten game
router.post('/collection/beaten', async (req, res) => {

    //find user collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser})

    //output
    if(currentUserCollection){

        const newItem = req.body.beaten
        let beatenGames = currentUserCollection.beaten

        //check if already beaten
        const checkBeaten = beatenGames.includes(newItem)
        if(checkBeaten)
            return res.status(400).send('You already beaten that game')

        //push game to array
        beatenGames.push(newItem)

        //save beaten
        try{
            const saveBeaten = await currentUserCollection.save()
            return res.send('You added new beaten game: '+newItem)
        }catch(err){
            return res.status(400).send(err)
        }

    }else
        return res.status(400).send("You can only add games to your collection") //FIXME: nwm jaki status, czy dobry send?


})

//POST add planned game
router.post('/collection/planned', async (req, res) => {

    //find user collection
    const currentUser = res.locals.verified.username
    const currentUserCollection = await CollectionModel.findOne({ username: currentUser})

    //output
    if(currentUserCollection){

        const newItem = req.body.planned
        let plannedGames = currentUserCollection.planned

        //check if already planned
        const checkPlanned = plannedGames.includes(newItem)
        if(checkPlanned)
            return res.status(400).send('You already planned that game')

        //push geme to array
        plannedGames.push(newItem)

        //save planned
        try{
            const savePlanned = await currentUserCollection.save()
            return res.send('You added new planned game: '+newItem)
        }catch(err){
            return res.status(400).send(err)
        }

    }else
        return res.status(400).send("You can only add games to your collection") //FIXME: nwm jaki status, czy dobry send?


})

export default router