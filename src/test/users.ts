const express = require('express')
const usersRouter = express.Router()
import jwt from 'jsonwebtoken'

interface User {
  login: string,
  password: string
}

//POST
usersRouter.post('/login', function (req: Request, res: Response) {
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

interface User {
    login: string,
    password: string
}

//POST
usersRouter.post('/login', function (req: Request, res: Response) {
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
