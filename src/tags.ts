const express = require('express')
const router = express.Router()
import jwt from 'jsonwebtoken'
import { readStorage, updateStorage, tags } from './storage'

router.use((req, res, next) => {

    //AUTHORIZATION
    const secret = 'topSecret'
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)
    if (payload !== undefined)
        next()

})

export interface Tag {
    id?: number
    name: string;
}

readStorage()


//POST
router.post('/tag', (req, res) => {

    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newTag: Tag = {
        id: id,
        name: req.body.name
    }

    //if tag have a name => create new tag
    if (newTag.name !== undefined) {

        //if there is no tag with that name -> add to tags[]
        if (!tags.find(tag => tag.name === newTag.name)) {
            tags.push(newTag)
            updateStorage()
            res.send(tags.find(tag => tag.id == id)) //sendStatus(201)
        }

    } else
        res.send("your tag dont have name") //sendStatus(400)

})


//GET single
router.get('/tag/:id', (req, res) => {

    const id = +req.params.id

    //if tag with that id exists => show single tag
    if (tags.find(tag => tag.id == id) !== undefined)
        res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
    else
        res.send("tag with that id dont exists") //sendStatus(404)

})


//GET all
router.get('/', (req, res) => {

    ////if tags exists in tags[] => show tags[]
    if (tags != undefined)
        res.send(tags) //sendStatus(200)
    else
        res.send("tags are empty") //sendStatus(400)

})


//PUT
router.put('/tag/:id', (req, res) => {

    const id = +req.params.id

    //if note with that id exists => edit specific tag
    if (tags.find(tag => tag.id == id) !== undefined) {
        tags[tags.findIndex(tag => tag.id == id)] = req.body;
        res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
    } else
        res.send("tag with that id dont exists") //sendStatus(404)

})


//DELETE
router.delete('/tag/:id', (req, res) => {

    const id = +req.params.id

    //if tag with that id exists => delete specific tag
    if (tags.find(tag => tag.id == id) !== undefined) {
        res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
        tags.splice(tags.findIndex(tag => tag.id == id), 1)
    } else
        res.send("tag with that id dont exists") //sendStatus(404)

})

export default router;