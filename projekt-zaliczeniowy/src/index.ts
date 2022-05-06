import express from 'express'
import gamesRoute from './games'
import genresRoute from './genres'
import developersRoute from './developers'
import publishersRoute from './publishers'

const app = express()
app.use(express.json())

app.use('/games', gamesRoute)
app.use('/genres', genresRoute)
app.use('/developers', developersRoute)
app.use('/publishers', publishersRoute)


app.listen(3002)