const express = require('express')
const notesRouter = express.Router()
import jwt from 'jsonwebtoken'

notesRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

interface Note {
    id?: number
    user: any
    title: string
    content: string
    createDate: string
    tags?: Tag[]
}

let notes: Note[] = [
    {
        id: 1,
        user: "testUser",
        title: "test",
        content: "this is a test note",
        createDate: "rndDate",
        tags: [
            { id: 1, name: "test name" }
        ]
    }
]

let notesData: Note[] = []

//POST
notesRouter.post('/note', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    //NEW NOTE REQUEST
    const data = new Date().toISOString()
    const id = req.body.id == null ? Date.now() : req.body.id
    const newNote: Note = {
        id: id,
        user: payload,
        title: req.body.title,
        content: req.body.content,
        createDate: data,
        tags: req.body.tags
    }


    //if new tag/tags in notes->tags
    const noteTags = req.body.tags as Tag[]
    noteTags.forEach(element => {
        if (!tags.find(tag => tag.name === element.name)) {
            const tagId = element.id == null ? Date.now() : element.id
            const newTag: Tag = {
                id: tagId,
                name: element.name.toLowerCase()
            }
            tags.push(newTag)
            updateStorage()
        }
    });

    //if true => create new note + add to notes[]
    if (newNote.title !== null && newNote.content !== null && payload !== undefined) {
        notes.push(newNote)
        updateStorage()
        res.send(newNote) //sendStatus(201)
    } else {
        res.send("no title or content") //sendStatus(400)
    }
})

//GET single
notesRouter.get('/note/:id', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = +req.params.id
    //if true => show single note
    if (notes.find(note => note.id == id) !== undefined && payload !== undefined) {
        res.send(notes.find(note => note.id == id)) //sendStatus(200)
    } else {
        res.send("no object") //sendStatus(404)
    }
})

//GET all
notesRouter.get('/notes', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    //if true => show notes[]
    if (notes != null && payload !== undefined)
        res.send(notes)
    else
        res.send("notes are empty") //sendStatus(400)
})

//PUT
notesRouter.put('/note/:id', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = +req.params.id
    //if true => edit specific note
    if (notes.find(note => note.id == id) !== undefined && payload !== undefined) {
        notes[notes.findIndex(note => note.id == id)] = req.body;
        res.send(notes.find(note => note.id == id)) //sendStatus(200)
    } else {
        res.send("no object") //sendStatus(404)
    }
})

//DELETE
notesRouter.delete('/note/:id', function (req: Request, res: Response) {

    //AUTHORIZATION
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)

    const id = +req.params.id
    //if true => delete specific note
    if (notes.find(note => note.id == id) !== undefined && payload !== undefined) {
        res.send(notes.find(note => note.id == id))
        notes.splice(notes.findIndex(note => note.id == id), 1)
    } else {
        res.send("no object") //sendStatus(404)
    }
})

module.exports = notesRouter