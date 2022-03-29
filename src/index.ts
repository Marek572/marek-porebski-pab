import express from 'express'
import {Request, Response} from 'express'
import fs from 'fs'

const app = express()

app.use(express.json())

//NOTES
interface Note {
  id?: number
  title: string
  content: string
  createDate: string
  tags?: Tag[]
}

let notes : Note[] =[
  {
    id: 1,
    title: "test",
    content: "this is a test note",
    createDate: "rndDate",
    tags: [
      {id: 1, name: "test name"}
    ]
  }
]

//POST
app.post('/note', function (req: Request, res: Response) {
  const data = new Date().toISOString()
  const id = req.body.id == null? Date.now(): req.body.id
  const newNote : Note =
  {
    id : id,
    title : req.body.title,
    content : req.body.content,
    createDate : data,
    tags : req.body.tags
  }

  //if new tag/tags in notes->tags
  const noteTags = req.body.tags as Tag[]
  noteTags.forEach(element => {
    if(!tags.findIndex(tag=>tag.name === element.name))
    {
      const tagId = element.id == null? Date.now(): element.id
      const newTag : Tag =
      {
        id: tagId,
        name: element.name.toLowerCase()
      }
      tags.push(newTag)
    }
  });

  if(newNote.title!==null && newNote.content!==null)
  {
    notes.push(newNote);
    res.send(notes.find(note=>note.id == id)) //sendStatus(201)
  }else{
    res.send("no title or content") //sendStatus(400)
  }
  })

//GET single
app.get('/note/:id', function (req: Request, res: Response) {
  const id = +req.params.id
  if(notes.find(note=>note.id == id) !== undefined) {
    res.send(notes.find(note=>note.id == id)) //sendStatus(200)
  }else{
    res.send("no object") //sendStatus(404)
  }
})

//GET all
app.get('/notes', function (req: Request, res: Response) {
  if(notes != null)
    res.send(notes)
  else
    res.send("notes are empty") //sendStatus(400)
})

//PUT
app.put('/note/:id', function (req: Request, res: Response) {
  const id = +req.params.id
  if(notes.find(note=>note.id == id) !== undefined){
    notes[notes.findIndex(note=>note.id == id)] = req.body;
    res.send(notes.find(note=>note.id == id)) //sendStatus(200)
  }else{
    res.send("no object") //sendStatus(404)
  }
})

//DELETE
app.delete('/note/:id', function(req: Request, res: Response){
  const id = +req.params.id
  if(notes.find(note=>note.id == id) !== undefined){
    res.send(notes.find(note=>note.id == id))
    notes.splice(notes.findIndex(note=>note.id == id),1)
  }else{
    res.send("no object") //sendStatus(404)
  }
})


//TAGS
interface Tag {
  id?: number
  name: string;
}

let tags : Tag[] =[
  {
    id: 1,
    name: "test name"
  }
]

//POST
app.post('/tag', function (req: Request, res: Response) {
  const id = req.body.id == null? Date.now(): req.body.id
  const newTag : Tag =
  {
    id : id,
    name : req.body.name
  }
  if(newTag.name!==null)
  {
    tags.push(newTag);
    res.send(tags.find(tag=>tag.id == id)) //sendStatus(201)
  }else{
    res.send("no name") //sendStatus(400)
  }
  // req.body.name.forEach(element => {
  //   if(!tags.findIndex(tag=>tag.name === element.name))
  //   {
  //     const tagId = element.id == null? Date.now(): element.id
  //     const newTag : Tag =
  //     {
  //       id: tagId,
  //       name: element.name.toLowerCase()
  //     }
  //     tags.push(newTag)
  //     console.log(req.body)
  //     res.sendStatus(201).send(newTag.id)
  //   }else{
  //       res.sendStatus(400).send("no name")
  //     }
  // });
})

//GET single
app.get('/tag/:id', function (req: Request, res: Response) {
  const id = +req.params.id
  if(tags.find(tag=>tag.id == id) !== undefined) {
    res.send(tags.find(tag=>tag.id == id)) //sendStatus(200)
  }else{
    res.send("no object") //sendStatus(404)
  }
})

//GET all
app.get('/tags', function (req: Request, res: Response) {
  if(tags != null)
    res.send(tags) //sendStatus(200)
  else
    res.send("tags are empty") //sendStatus(400)
})

//PUT
app.put('/tag/:id', function (req: Request, res: Response) {
  const id = +req.params.id
  if(tags.find(tag=>tag.id == id) !== undefined){
    tags[tags.findIndex(tag=>tag.id == id)] = req.body;
    res.send(tags.find(tag=>tag.id == id)) //sendStatus(200)
  }else{
    res.send("no object") //sendStatus(404)
  }
})

//DELETE
app.delete('/tag/:id', function(req: Request, res: Response){
  const id = +req.params.id
  if(tags.find(tag=>tag.id == id) !== undefined){
    res.send(tags.find(tag=>tag.id == id)) //sendStatus(200)
    notes.splice(tags.findIndex(tag=>tag.id == id),1)
  }else{
    res.send("no object") //sendStatus(404)
  }
})

app.listen(3001)
