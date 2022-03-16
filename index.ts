import express from 'express'
import {Request, Response} from 'express'

const app = express()

app.use(express.json())

class CreateNote {
  title: string;
  content: string;
  createDate: string;
  tags: string[];
  id?: number
 
  constructor(title:string, content: string, createDate: string, tags: string[], id?: number){
    this.title = title;
    this.content = content;
    this.createDate = createDate;
    this.tags = tags;
    this.id = id
  }
}

app.get('/note', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body.title) // e.x. req.body.title 
  res.status(201).send('POST Hello World')
})

app.listen(3001)
