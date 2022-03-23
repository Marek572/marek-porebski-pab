import express from 'express'
import {Request, Response} from 'express'

const app = express()

app.use(express.json())

//NOTES
interface Note {
  id?: number
  title: string
  content: string
  createDate: string
  tags?: Tag[]
 
  // constructor(n: Note){
  //   this.id = Date.now()
  //   this.title = n.title;
  //   this.content = n.content;
  //   this.createDate = n.createDate;
  //   this.tags = n.tags;
  // }
}

let notes : Note[] =[
  {
    id: 1,
    title: "test",
    content: "this is a test note",
    createDate: "rndDate",
    // tags: ["tag1"]
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
    console.log(req.body) 
    res.sendStatus(201).send(newNote.id)
  }else{
    res.sendStatus(400).send("no title or content")
  }
  })

//GET single
app.get('/note/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(notes.findIndex(note=>note.id == id)){
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
  }else{
    res.sendStatus(404).send("no object")
  }
})

//GET all
app.get('/note', function (req: Request, res: Response) {
  if(notes != null)
    res.sendStatus(200).send(notes)
  else
    res.sendStatus(400).send("notes are empty")
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
    console.log(req.body) 
    res.sendStatus(201).send(newTag.id)
  }else{
    res.sendStatus(400).send("no name")
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
  const id = parseInt(req.body.id)
  if(tags.findIndex(tag=>tag.id == id)){
    res.sendStatus(200).send(tags.findIndex(tag=>tag.id == id))
  }else{
    res.sendStatus(404).send("no object")
  }
})

//GET all
app.get('/tags', function (req: Request, res: Response) {
  if(tags != null)
    res.sendStatus(200).send(tags)
  else
    res.sendStatus(400).send("tags are empty")
})

//PUT
app.put('/tag/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(tags.findIndex(tag=>tag.id == id)){
    tags[tags.findIndex(tag=>tag.id == id)] = req.body;
    res.sendStatus(200).send(tags.findIndex(tag=>tag.id == id))
  }else{
    res.sendStatus(404).send("no object")
  }
})

//DELETE
app.delete('/tag/:id', function(req: Request, res: Response){
  const id = parseInt(req.body.id)
  if(tags.find(note=>note.id == id)){
    res.sendStatus(200).send(tags.findIndex(tag=>tag.id == id))
    notes.splice(tags.findIndex(tag=>tag.id == id),1)
  }else{
    res.sendStatus(404).send("no object")
  }
})

app.listen(3001)
