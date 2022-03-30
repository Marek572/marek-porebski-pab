import express from 'express'
import { Request, Response } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

const secret = 'topSecret'

////////////////////////////////Notes////////////////////////////////
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

//POST
app.post('/note', function (req: Request, res: Response) {

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
    }
  });

  //if true => create new note + add to notes[]
  if (newNote.title !== null && newNote.content !== null && payload !== undefined) {
    notes.push(newNote);
    res.send(newNote) //sendStatus(201)
  } else {
    res.send("no title or content") //sendStatus(400)
  }
})

//GET single
app.get('/note/:id', function (req: Request, res: Response) {

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
app.get('/notes', function (req: Request, res: Response) {

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
app.put('/note/:id', function (req: Request, res: Response) {

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
app.delete('/note/:id', function (req: Request, res: Response) {

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


////////////////////////////////Tags////////////////////////////////

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
app.post('/tag', function (req: Request, res: Response) {

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
    tags.push(newTag);
    res.send(tags.find(tag => tag.id == id)) //sendStatus(201)
  } else {
    res.send("no name or tag already exists") //sendStatus(400)
  }
})

//GET single
app.get('/tag/:id', function (req: Request, res: Response) {

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
app.get('/tags', function (req: Request, res: Response) {

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
app.put('/tag/:id', function (req: Request, res: Response) {

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
app.delete('/tag/:id', function (req: Request, res: Response) {

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


////////////////////////////////Login////////////////////////////////

interface User {
  login: string,
  password: string
}

//POST
app.post('/login', function (req: Request, res: Response) {
  const newUser: User = {
    login: req.body.login,
    password: req.body.password
  }

  const token = jwt.sign(newUser.login, secret)

  if (token !== undefined) {
    res.send(token)// res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
})

app.listen(3001)
