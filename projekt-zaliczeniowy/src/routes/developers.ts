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
        return res.status(404).send("Developer list is empty")

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
        return res.status(404).send("Developer with id " + id + " not found")

})

//TODO: POST add few developers

//POST add developer
router.post('/developer', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //validation
    const { error } = developerValidation(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    //new developer
    const { devName, founder } = req.body
    const newDeveloper = new DeveloperModel({
        devName: devName.toLowerCase(),
        founder: founder.toLowerCase()
    })

    //check if developer exsists
    const developer = await DeveloperModel.findOne({ devName: devName })
    if (developer)
        return res.status(400).send("Developer with name " + devName + " already exist")

    //save developer
    try {
        const saveDeveloper = await newDeveloper.save()
        return res.status(201).send("You added new developer: " + saveDeveloper.devName)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//PUT edit specific developer
router.put('/developer/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find developer
    const id = req.params.id
    let idDeveloper = await DeveloperModel.findOne({ _id: id })

    //check if developer exists
    if (!idDeveloper)
        return res.status(404).send("Developer with id " + id + " does not exist")

    //update developer
    try {
        const updateDeveloper = await DeveloperModel.updateOne({ _id: id }, req.body)
        return res.status(204).send("You edited developer with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

//DELETE delete specific game
router.delete('/developer/:id', async (req, res) => {

    //check if currentUser is admin
    const currentUser = res.locals.verified.username
    if (currentUser !== 'admin')
        return res.status(403).send('Access denied')

    //find developer
    const id = req.params.id
    let idDeveloper = await DeveloperModel.findOne({ _id: id })

    //check if developer exists
    if (!idDeveloper)
        return res.status(404).send("Developer with id " + id + " does not exist")

    //delete developer
    try {
        const deleteDeveloper = await DeveloperModel.deleteOne({ _id: id })
        return res.status(204).send("You deleted developer with id " + id)
    } catch (err) {
        return res.status(400).send(err)
    }

})

export default router