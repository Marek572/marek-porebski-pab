// const express = require('express')
// const router = express.Router()
// import jwt from 'jsonwebtoken'

// export interface User {
//   login: string,
//   password: string,
//   token: string
// }

// let users: User[] = [
//   {
//     login: "testLogin",
//     password: "testPassword",
//     token: "testToken"
//   }
// ]

// //POST
// router.post('/login', function (req: Request, res: Response) {

//   const token = jwt.sign(req.body.login, secret)

//   const newUser: User = {
//     login: req.body.login,
//     password: req.body.password,
//     token: token
//   }

//   //if true => user authorized to:
//   if (token !== undefined) {

//     //if user have a login and password...
//     if (newUser.login !== undefined && newUser.password !== undefined) {

//       //if there is no user with that login -> add to users[]
//       if (!users.find(user => user.login === newUser.login)) {
//         users.push(newUser)
//         updateStorage()
//         res.sendStatus(200)
//       } else
//         res.send("user with that login already exists")

//     }

//   } else
//     res.sendStatus(401)
// })