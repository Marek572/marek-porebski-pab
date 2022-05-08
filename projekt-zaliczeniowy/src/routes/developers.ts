const express = require('express')
const router = express.Router()
import { readStorage, updateStorage, developers} from '../storage'
import { verifyUser } from '../verifyToken'

router.use((req, res, next) => {
    verifyUser(req,res,next)
    next()
})

export interface Developer {
    id?: number,
    devName: string
    founder?: string
}

readStorage()

//GET all developers
router.get('/', (req, res) => {

    //output
    if(developers.length>0)
        res.status(200).send(developers)
    else
        res.status(404).send("developer list is empty")

})

//GET single developer by id
router.get('/developer/:id', (req, res) =>{

    const id = +req.params.id

    //output
    if(developers.find(developer => developer.id ==id) !== undefined)
        res.status(200).send(developers.find(developer => developer.id))
    else
        res.status(404).send("developer with id " + id + " not found")

})


//FIXME: post,put,delete require admin privileges
//TODO: POST add few developers

//POST add game
router.post('/developer', (req, res) => {

    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newDeveloper: Developer = {
        id: id,
        devName: req.body.devName,
        founder: req.body.founder
    }

    //output
    if(newDeveloper !== undefined){
        if(!developers.find(developer => developer.id === newDeveloper.id)){
            developers.push(newDeveloper)
            updateStorage()
            res.status(201).send("You added new developer: " + newDeveloper.devName)
        }
        else
            res.status(400).send("developer with id " + id + " already exist")
    }
    else
        res.status(400).send("wrong construction of newDeveloper")

})

//PUT edit specific game
router.put('/developer/:id', (req, res) => {

    const id = +req.params.id

    //output
    if(developers.find(developer => developer.id == id) !== undefined){
        developers[id] = req.body
        updateStorage()
        res.status(200).send("You edited developer with id " + id)
    }
    else
        res.status(404).send("developer with id " + id + " does not exist")

})

//DELETE delete specific game
router.delete('/developer/:id', (req, res) => {

    const id = +req.params.id

    //output
    if(developers.find(developer => developer.id == id) !== undefined){
        res.status(200).send("You deleted developer with id " + id)
        developers.splice(developers.findIndex(developer => developer.id == id), 1)
        updateStorage()
    }
    else
        res.status(404).send("developer with id " + id + " does not exist")

})

export default router

//NOTES:
//FIXME: zastanowic sie czy na pewno szukac wszystkiego po id a nie po nazwach
//FIXME: toLowerCase() przy zapisie (raczej storage.ts przy JSON.stringify, CHYBA)?