import notesRoute from './notes'
import tagsRoute from './tags'
import usersRoute from './users'
// import {main} from './mongodb'
import express from 'express'
import { Request, Response } from 'express'
import fs from 'fs'

const app = express()
app.use(express.json())

// main()

app.use('/notes', notesRoute)
app.use('/tags', tagsRoute)
app.use('/users', usersRoute)


app.listen(3001)