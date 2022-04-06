const express = require('express')
const tagsRouter = express.Router()
import jwt from 'jsonwebtoken'

interface Tag {
    id?: number
    name: string;
}

let tags: Tag[] = [
    {
        id: 1,
        name: "test name"
    }
]

//POST
tagsRouter.post('/tag', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = req.body.id == null ? Date.now() : req.body.id
    const newTag: Tag = {
        id: id,
        name: req.body.name
    }

    //if true => create new tag
    if (newTag.name !== null && !tags.find(tag => tag.name === newTag.name) && payload !== undefined) {
        tags.push(newTag)
        updateStorage()
        res.send(tags.find(tag => tag.id == id)) //sendStatus(201)
    } else {
        res.send("no name or tag already exists") //sendStatus(400)
    }
})

//GET single
tagsRouter.get('/tag/:id', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = +req.params.id
    //if true => show sign tag
    if (tags.find(tag => tag.id == id) !== undefined && payload !== undefined) {
        res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
    } else {
        res.send("no object") //sendStatus(404)
    }
})

//GET all
tagsRouter.get('/tags', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    //if true => show tags[]
    if (tags != null)
        res.send(tags) //sendStatus(200)
    else
        res.send("tags are empty") //sendStatus(400)
})

//PUT
tagsRouter.put('/tag/:id', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = +req.params.id
    //if true => edit specific tag
    if (tags.find(tag => tag.id == id) !== undefined && payload !== undefined) {
        tags[tags.findIndex(tag => tag.id == id)] = req.body;
        res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
    } else {
        res.send("no object") //sendStatus(404)
    }
})

//DELETE
tagsRouter.delete('/tag/:id', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = +req.params.id
    //if true => delete specific tag
    if (tags.find(tag => tag.id == id) !== undefined) {
        res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
        notes.splice(tags.findIndex(tag => tag.id == id), 1)
    } else {
        res.send("no object") //sendStatus(404)
    }
})

