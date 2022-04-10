import express from 'express'
import { Request, Response } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'

// import notesRouter from './routes/notes'

const app = express()
app.use(express.json())

const secret = 'topSecret'

async function readStorage(): Promise<void> {
  try {
    notes = JSON.parse(await fs.promises.readFile("./src/data/notes.json", 'utf-8'))
    tags = JSON.parse(await fs.promises.readFile("./src/data/tags.json", 'utf-8'))
    users = JSON.parse(await fs.promises.readFile("./src/data/users.json", 'utf-8'))
  } catch (err) {
    console.log(err)
  }
}

async function updateStorage(): Promise<void> {
  try {
    await fs.promises.writeFile("./src/data/notes.json", JSON.stringify(notes))
    await fs.promises.writeFile("./src/data/tags.json", JSON.stringify(tags))
    await fs.promises.writeFile("./src/data/users.json", JSON.stringify(users))
  } catch (err) {
    console.log(err)
  }
}

readStorage()


//TEST
// app.use('/users', notesRouter)



////////////////////////////////Notes////////////////////////////////
export interface Note {
  id?: number
  user: any
  title: string
  content: string
  createDate: string
  visibility: boolean
  tags?: Tag[]
}

let notes: Note[] = [
  {
    id: 1,
    user: "testUser",
    title: "test",
    content: "this is a test note",
    createDate: "rndDate",
    visibility: true,
    tags: [
      { id: 1, name: "tag1" }
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
  const id = req.body.id == undefined ? Date.now() : req.body.id
  const newNote: Note = {
    id: id,
    user: payload,
    title: req.body.title,
    content: req.body.content,
    createDate: data,
    visibility: req.body.visibility,
    tags: req.body.tags
  }

  //if true => user authorized to:
  if (payload !== undefined) {

    const noteTags = req.body.tags as Tag[]

    //if new tag/tags in notes-> add to tags
    noteTags.forEach(element => {
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

  } else
    res.sendStatus(401) //unauthorized
})

//GET single
app.get('/note/:id', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = +req.params.id

  //if true => user authorized to:
  if (payload !== undefined) {

    //if note with that id exists => show single note
    if (notes.find(note => note.id == id) !== undefined)
      res.send(notes.find(note => note.id == id) ) //sendStatus(200)
    else
      res.send("note with that id dont exists")

  } else
    res.sendStatus(401) //unauthorized
})

//GET all
app.get('/notes', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  //if true => user authorized to:
  if (payload !== undefined) {

    //if notes exists in notes[] => show notes[]
    if (notes !== undefined)
      res.send(notes)
    else
      res.send("notes are empty") //sendStatus(400)

  } else
    res.sendStatus(401) //unauthorized
})

app.get('/notes/user/:userName', function (req, res) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const user = req.params.userName

  //if true => user authorized to:
  if (payload !== undefined) {

    const userNotes = []
    for(var i = 0; i < notes.length; i++){
      if(notes[i].user == user && notes[i].visibility == true)
        userNotes.push(notes[i])
    }
    res.send(userNotes)

  } else
    res.sendStatus(401) //unauthorized

})


//PUT
app.put('/note/:id', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = +req.params.id

  //if true => user authorized to:
  if (payload !== undefined) {

    //if note with that id exists => edit specific note
    if (notes.find(note => note.id == id) !== undefined) {
      notes[notes.findIndex(note => note.id == id)] = req.body;
      res.send(req.body) //sendStatus(200)
    } else
      res.send("note with that id dont exists") //sendStatus(404)

  } else
    res.sendStatus(401) //unauthorized
})

//DELETE
app.delete('/note/:id', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = +req.params.id

  //if true => user authorized to:
  if (payload !== undefined) {

    //if note with that id exists => delete specific note
    if (notes.find(note => note.id == id) !== undefined) {
      res.send(notes.find(note => note.id == id))
      notes.splice(notes.findIndex(note => note.id == id), 1)
    } else
      res.send("note with that id dont exists") //sendStatus(404)

  } else
    res.sendStatus(401) //unauthorized
})


////////////////////////////////Tags////////////////////////////////

export interface Tag {
  id?: number
  name: string;
}

let tags: Tag[] = [
  {
    id: 1,
    name: "testTag"
  }
]

//POST
app.post('/tag', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = req.body.id == undefined ? Date.now() : req.body.id
  const newTag: Tag = {
    id: id,
    name: req.body.name
  }


  //if true => user authorized to:
  if (payload !== undefined) {

    //if tag have a name => create new tag
    if (newTag.name !== undefined) {

      //if there is no tag with that id -> add to tags[]
      if (!tags.find(tag => tag.name === newTag.name)) {
        tags.push(newTag)
        updateStorage()
        res.send(tags.find(tag => tag.id == id)) //sendStatus(201)
      }

    } else
      res.send("your tag dont have name") //sendStatus(400)

  } else
    res.sendStatus(401) //unauthorized
})

//GET single
app.get('/tag/:id', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = +req.params.id

  //if true => user authorized to:
  if (payload !== undefined) {

    //if tag with that id exists => show single tag
    if (tags.find(tag => tag.id == id) !== undefined)
      res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
    else
      res.send("tag with that id dont exists") //sendStatus(404)

  } else
    res.sendStatus(401) //unauthorized
})

//GET all
app.get('/tags', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  //if true => user authorized to:
  if (payload !== undefined) {

    ////if tags exists in tags[] => show tags[]
    if (tags != undefined)
      res.send(tags) //sendStatus(200)
    else
      res.send("tags are empty") //sendStatus(400)

  } else
    res.sendStatus(401) //unauthorized
})

//PUT
app.put('/tag/:id', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = +req.params.id

  //if true => user authorized to:
  if (payload !== undefined) {

    //if note with that id exists => edit specific tag
    if (tags.find(tag => tag.id == id) !== undefined) {
      tags[tags.findIndex(tag => tag.id == id)] = req.body;
      res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
    } else
      res.send("tag with that id dont exists") //sendStatus(404)

  } else
    res.sendStatus(401) //unauthorized
})

//DELETE
app.delete('/tag/:id', function (req: Request, res: Response) {

  //AUTHORIZATION
  const authData = req.headers.authorization
  const token = authData?.split(' ')[1] ?? ""
  const payload = jwt.verify(token, secret)

  const id = +req.params.id

  //if true => user authorized to:
  if (payload !== undefined) {

    //if note with that id exists => delete specific tag
    if (tags.find(tag => tag.id == id) !== undefined) {
      res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
      notes.splice(tags.findIndex(tag => tag.id == id), 1)
    } else
      res.send("tag with that id dont exists") //sendStatus(404)

  } else
    res.sendStatus(401) //unauthorized
})


////////////////////////////////Users////////////////////////////////

export interface User {
  login: string,
  password: string,
  token: string
}

let users: User[] = [
  {
    login: "testUser",
    password: "testPassword",
    token: "eyJhbGciOiJIUzI1NiJ9.dGVzdExvZ2lu.8s9Jwp9TBbtZlVzENc3uOra_MkywHWdzsN8VsX_RWO0"
  }
]

//POST
app.post('/login', function (req: Request, res: Response) {

  const token = jwt.sign(req.body.login, secret)

  const newUser: User = {
    login: req.body.login,
    password: req.body.password,
    token: token
  }

  //if true => user authorized to:
  if (token !== undefined) {

    //if user have a login and password...
    if (newUser.login !== undefined && newUser.password !== undefined) {

      //if there is no user with that login -> add to users[]
      if (!users.find(user => user.login === newUser.login)) {
        users.push(newUser)
        updateStorage()
        res.sendStatus(200)
      } else
        res.send("user with that login already exists")

    }

  } else
    res.sendStatus(401)
})

app.listen(3001)