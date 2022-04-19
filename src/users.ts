const express = require('express')
const router = express.Router()
import jwt from 'jsonwebtoken'
import { readStorage, updateStorage, users } from './storage'

router.use((req, res, next) => {

})

export interface User {
  login: string,
  password: string,
  token: string
}

readStorage()


//POST
router.post('/login', (req, res) => {

  const token = jwt.sign(req.body.login, 'topSecret')

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

export default router;