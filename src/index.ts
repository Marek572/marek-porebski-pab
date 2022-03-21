import express from 'express'
import {Request, Response} from 'express'
import { parse } from 'path'

const app = express()

app.use(express.json())

interface Note {
  id?: number
  title: string;
  content: string;
  createDate: string;
  tags: string[];
 
  // constructor(n: Note){
  //   this.id = Date.now()
  //   this.title = n.title;
  //   this.content = n.content;
  //   this.createDate = n.createDate;
  //   this.tags = n.tags;
  // }
}

const notes : Note[] =[
  {
    id: 1,
    title: "test",
    content: "this is a test note",
    createDate: "rndDate",
    tags: ["tag1"]
  }
]

app.use(express.json())


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
  if(newNote.title!==null && newNote.content!==null)
  {
    notes.push(newNote);
    console.log(req.body) 
    res.sendStatus(201).send(newNote.id)
  }else{
    res.sendStatus(400).send("no title or content")
  }
  })

//GET
app.get('/note/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(notes.findIndex(note=>note.id == id)){
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
  }else{
    res.sendStatus(404).send("no object")
  }
})

//PUT
app.put('/note/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(notes.findIndex(note=>note.id == id)){
    notes[notes.findIndex(note=>note.id == id)] = req.body;
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
  }else{
    res.sendStatus(404).send("no object")
  }
})

//DELETE
app.delete('/note/:id', function(req: Request, res: Response){
  const id = parseInt(req.body.id)
  if(notes.find(note=>note.id == id)){
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
    notes.splice(notes.findIndex(note=>note.id == id),1)
  }else{
    res.sendStatus(404).send("no object")
  }
})

app.listen(3001)
