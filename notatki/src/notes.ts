const express = require('express')
const router = express.Router()
import jwt from 'jsonwebtoken'
import { readStorage, updateStorage, notes, tags } from './storage'
import { Tag } from './tags'

router.use((req, res, next) => {

    //AUTHORIZATION
    const secret = 'topSecret'
    const authData = req.headers.authorization
    const token = authData?.split(' ')[1] ?? ""
    const payload = jwt.verify(token, secret)
    if (payload !== undefined)
        next()

})

export interface Note {
    id?: number
    user: string
    title: string
    content: string
    createDate: string
    visibility: boolean
    tags?: Tag[]
}

readStorage()


//POST
router.post('/note', (req, res) => {

    //NEW NOTE REQUEST
    const date = new Date().toISOString()
    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newNote: Note = {
        id: id,
        user: req.body.user,
        title: req.body.title,
        content: req.body.content,
        createDate: date,
        visibility: req.body.visibility,
        tags: req.body.tags
    }

    //if new tag/tags in notes-> add to tags
    const noteTags = req.body.tags as Tag[]

    noteTags.forEach(element => {

        //if there is no tag with that name -> add to tags[]
        if (!tags.find(tag => tag.name === element.name)) {
            const tagId = element.id == undefined ? Date.now() : element.id
            const newTag: Tag = {
                id: tagId,
                name: element.name.toLowerCase()
            }
            tags.push(newTag)
            updateStorage()
        }

    });

    //if title & content exists...
    if (newNote.title !== undefined && newNote.content !== undefined) {

        //if there is no note with that id -> add to notes[]
        if (!notes.find(note => note.id === newNote.id)) {
            notes.push(newNote)
            updateStorage()
            res.send(newNote) //sendStatus(201)
        } else
            res.send("note with that id already exists")

    } else
        res.send("no title or content") //sendStatus(400)
})


//GET single
router.get('/note/:id', (req, res) => {

    const id = +req.params.id

    //if note with that id exists => show single note
    if (notes.find(note => note.id == id) !== undefined)
        res.send(notes.find(note => note.id == id)) //sendStatus(200)
    else
        res.send("note with that id dont exists")

})


//GET all
router.get('/', (req, res) => {

    //if notes exists in notes[] => show notes[]
    if (notes !== undefined)
        res.send(notes)
    else
        res.send("notes are empty") //sendStatus(400)
})


//GET all public
router.get('/user/:userName', (req, res) => {

    const user = req.params.userName

    const userNotes = []
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].user == user && notes[i].visibility == true)
            userNotes.push(notes[i])
    }
    res.send(userNotes)

})


//PUT
router.put('/note/:id', (req, res) => {

    const id = +req.params.id

    //if note with that id exists => edit specific note
    if (notes.find(note => note.id == id) !== undefined) {
        notes[id] = req.body
        updateStorage()
        res.send(req.body) //sendStatus(200)
    } else
        res.send("note with that id dont exists") //sendStatus(404)

})


//DELETE
router.delete('/note/:id', (req, res) => {

    const id = +req.params.id


    //if note with that id exists => delete specific note
    if (notes.find(note => note.id == id) !== undefined) {
        res.send(notes.find(note => note.id == id))
        notes.splice(notes.findIndex(note => note.id == id), 1)
        updateStorage()
    } else
        res.send("note with that id dont exists") //sendStatus(404)
})

export default router;