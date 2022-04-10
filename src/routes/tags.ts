// const express = require('express')
// const router = express.Router()
// import jwt from 'jsonwebtoken'

// export interface Tag {
//     id?: number
//     name: string;
// }

// let tags: Tag[] = [
//     {
//         id: 1,
//         name: "test name"
//     }
// ]

// //POST
// router.post('/tag', function (req: Request, res: Response) {

//     //AUTHORIZATION
//     const authData = req.headers.authorization
//     const token = authData?.split(' ')[1] ?? ""
//     const payload = jwt.verify(token, secret)

//     const id = req.body.id == undefined ? Date.now() : req.body.id
//     const newTag: Tag = {
//         id: id,
//         name: req.body.name
//     }


//     //if true => user authorized to:
//     if (payload !== undefined) {

//         //if tag have a name => create new tag
//         if (newTag.name !== undefined) {

//             //if there is no tag with that id -> add to tags[]
//             if (!tags.find(tag => tag.name === newTag.name)) {
//                 tags.push(newTag)
//                 updateStorage()
//                 res.send(tags.find(tag => tag.id == id)) //sendStatus(201)
//             }

//         } else
//             res.send("your tag dont have name") //sendStatus(400)

//     } else
//         res.sendStatus(401) //unauthorized
// })

// //GET single
// router.get('/tag/:id', function (req: Request, res: Response) {

//     //AUTHORIZATION
//     const authData = req.headers.authorization
//     const token = authData?.split(' ')[1] ?? ""
//     const payload = jwt.verify(token, secret)

//     const id = +req.params.id

//     //if true => user authorized to:
//     if (payload !== undefined) {

//         //if tag with that id exists => show single tag
//         if (tags.find(tag => tag.id == id) !== undefined)
//             res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
//         else
//             res.send("tag with that id dont exists") //sendStatus(404)

//     } else
//         res.sendStatus(401) //unauthorized
// })

// //GET all
// router.get('/tags', function (req: Request, res: Response) {

//     //AUTHORIZATION
//     const authData = req.headers.authorization
//     const token = authData?.split(' ')[1] ?? ""
//     const payload = jwt.verify(token, secret)

//     //if true => user authorized to:
//     if (payload !== undefined) {

//         ////if tags exists in tags[] => show tags[]
//         if (tags != undefined)
//             res.send(tags) //sendStatus(200)
//         else
//             res.send("tags are empty") //sendStatus(400)

//     } else
//         res.sendStatus(401) //unauthorized
// })

// //PUT
// router.put('/tag/:id', function (req: Request, res: Response) {

//     //AUTHORIZATION
//     const authData = req.headers.authorization
//     const token = authData?.split(' ')[1] ?? ""
//     const payload = jwt.verify(token, secret)

//     const id = +req.params.id

//     //if true => user authorized to:
//     if (payload !== undefined) {

//         //if note with that id exists => edit specific tag
//         if (tags.find(tag => tag.id == id) !== undefined) {
//             tags[tags.findIndex(tag => tag.id == id)] = req.body;
//             res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
//         } else
//             res.send("tag with that id dont exists") //sendStatus(404)

//     } else
//         res.sendStatus(401) //unauthorized
// })

// //DELETE
// router.delete('/tag/:id', function (req: Request, res: Response) {

//     //AUTHORIZATION
//     const authData = req.headers.authorization
//     const token = authData?.split(' ')[1] ?? ""
//     const payload = jwt.verify(token, secret)

//     const id = +req.params.id

//     //if true => user authorized to:
//     if (payload !== undefined) {

//         //if note with that id exists => delete specific tag
//         if (tags.find(tag => tag.id == id) !== undefined) {
//             res.send(tags.find(tag => tag.id == id)) //sendStatus(200)
//             notes.splice(tags.findIndex(tag => tag.id == id), 1)
//         } else
//             res.send("tag with that id dont exists") //sendStatus(404)

//     } else
//         res.sendStatus(401) //unauthorized
// })

// export default router;