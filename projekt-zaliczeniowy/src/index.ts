import express from 'express'
import gamesRoute from './routes/games'
import genresRoute from './routes/genres'
import developersRoute from './routes/developers'
import publishersRoute from './routes/publishers'
import authRoute from './routes/auth'
import collectionsRoute from './routes/collections'
import mongoose from 'mongoose'
import { env } from 'process'
import dotenv from 'dotenv'
const UserModel = require('./models/UserModel')

dotenv.config()
mongoose.connect(process.env.MONGO_URI, () => console.log('connected to mongDB'))

const app = express()

app.use((req, res, next) => {
    // createAdmin()
    next()
})


app.use(express.json())
app.use('/games', gamesRoute)
app.use('/genres', genresRoute)
app.use('/developers', developersRoute)
app.use('/publishers', publishersRoute)
app.use('/auth', authRoute)
app.use('/collections', collectionsRoute)


app.listen(3000)