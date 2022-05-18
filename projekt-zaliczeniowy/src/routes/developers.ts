const express = require('express')
const router = express.Router()
const DeveloperModel = require('../models/DeveloperModel')
import { developerValidation } from '../validation'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req, res, next)
})


//GET all developers
router.get('/', async (req, res) => {

    //find developers
    const allDevelopers = await DeveloperModel.find()

    //output
    if (allDevelopers.length > 0)
        return res.send(allDevelopers)
    else
        return res.status(404).send("developer list is empty")

})

//GET single developer by id
router.get('/developer/:id', async (req, res) => {

    //find game
    const id = req.params.id
    const idDeveloper = await DeveloperModel.findOne({ _id: id })

    //output
    if (idDeveloper)
        return res.send(idDeveloper)
    else
        return res.status(404).send("developer with id " + id + " not found")

})


//FIXME: post,put,delete require admin privileges
//TODO: POST add few developers

//POST add game
router.post('/developer', async (req, res) => {

    //validation
    const { error } = developerValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //new developer
    const { devName, founder } = req.body
    const newDeveloper = new DeveloperModel({
        devName: devName,
        founder: founder
    })

    //check if developer exsist
    const developer = await DeveloperModel.findOne({ devName: devName })
    if (developer)
        return res.status(400).send("developer with name " + devName + " already exist")

    //save developer
    try {
        const saveDeveloper = await newDeveloper.save()
        return res.status(201).send("You added new developer: " + saveDeveloper.devName)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//PUT edit specific game
router.put('/developer/:id', async (req, res) => {

    //find developer
    const id = req.params.id
    let idDeveloper = await DeveloperModel.findOne({ _id: id })

    //check if game exist
    if (!idDeveloper)
        return res.status(404).send("developer with id " + id + " does not exist")

    //update game
    try {
        const updateDeveloper = await DeveloperModel.updateOne({ _id: id }, req.body)
        return res.send("You edited developer with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//DELETE delete specific game
router.delete('/developer/:id', async (req, res) => {

    //find developer
    const id = req.params.id
    let idDeveloper = await DeveloperModel.findOne({ _id: id })

    //check if developer exist
    if (!idDeveloper)
        return res.status(404).send("developer with id " + id + " does not exist")

    //delete developer
    try {
        const deleteDeveloper = await DeveloperModel.deleteOne({ _id: id })
        return res.send("You deleted developer with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

export default router

//NOTES:
//FIXME: zastanowic sie czy na pewno szukac wszystkiego po id a nie po nazwach
//FIXME: toLowerCase() przy zapisie (raczej storage.ts przy JSON.stringify, CHYBA)?