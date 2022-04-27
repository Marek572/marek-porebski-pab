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

//TODO: check
//POST
router.post('/login', (req, res) => {
    console.log('xd1')
    //if there is no user with that login...
    if (users.find(user => user.login === req.body.login)) {
        const token = jwt.sign(req.body.login, 'topSecret')
        console.log('xd2')
        if (token !== undefined){
            console.log('xd3')
            res.status(200).send(token)}
        else{
            console.log('xd4')
            res.status(401).send('Unauthorized')}

    }else
        res.send('user with that login dont exists')

})


// const newUser: User = {
//     login: req.body.login,
//     password: req.body.password,
//   }
// //if user have a login and password...
// if (newUser.login !== undefined && newUser.password !== undefined) {

//     //if there is no user with that login -> add to users[]
//     if (!users.find(user => user.login === newUser.login)) {
//       users.push(newUser)
//       updateStorage()
//       res.sendStatus(200)
//     } else
//       res.send("user with that login already exists")

//   }

export default router;