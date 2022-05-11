import express from 'express'
import gamesRoute from './routes/games'
import genresRoute from './routes/genres'
import developersRoute from './routes/developers'
import publishersRoute from './routes/publishers'
import authRoute from './routes/auth'

import mongoose from 'mongoose'
import { env } from 'process'
//FIXME: dotenv nie dziala, nie mam pomyslu na to
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env)
mongoose.connect(process.env.MONGO_URI, () => console.log('connected to mongDB'))
// mongoose.connect('mongodb+srv://admin:admin@cluster0.1zrl4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => console.log('connected to mongDB'))

const app = express()
app.use(express.json())

app.use('/games', gamesRoute)
app.use('/genres', genresRoute)
app.use('/developers', developersRoute)
app.use('/publishers', publishersRoute)
app.use('/auth', authRoute)


app.listen(3000)