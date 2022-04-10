// const express = require('express')
// const router = express.Router()
// import {Tag} from './tags'
// // import {User} from './users'
// import jwt from 'jsonwebtoken'

// router.use((req, res, next) => {
//     //AUTHORIZATION
//     const secret = 'topSecret'
//     const userToken = users.find(user => user.token === token)
//     const payload = jwt.verify(token, secret)
//     if (payload !== undefined)
//         next()
// })

// interface Note {
//     id?: number
//     user: any
//     title: string
//     content: string
//     createDate: string
//     tags?: Tag[]
// }

// let notes: Note[] = [
//     {
//         id: 1,
//         user: "testUser",
//         title: "test",
//         content: "this is a test note",
//         createDate: "rndDate",
//         tags: [
//             { id: 1, name: "test name" }
//         ]
//     }
// ]

// // //POST
// // router.post('/', function (req: Request, res: Response) {

// //     //AUTHORIZATION
// //     const authData = req.headers.authorization
// //     const token = authData?.split(' ')[1] ?? ""
// //     const payload = jwt.verify(token, secret)

// //     //NEW NOTE REQUEST
// //     const data = new Date().toISOString()
// //     const id = req.body.id == undefined ? Date.now() : req.body.id
// //     const newNote: Note = {
// //         id: id,
// //         user: payload,
// //         title: req.body.title,
// //         content: req.body.content,
// //         createDate: data,
// //         tags: req.body.tags
// //     }

// //     //if true => user authorized to:
// //     if (payload !== undefined) {

// //         const noteTags = req.body.tags as Tag[]

// //         //if new tag/tags in notes-> add to tags
// //         noteTags.forEach(element => {
// //             if (!tags.find(tag => tag.name === element.name)) {
// //                 const tagId = element.id == undefined ? Date.now() : element.id
// //                 const newTag: Tag = {
// //                     id: tagId,
// //                     name: element.name.toLowerCase()
// //                 }
// //                 tags.push(newTag)
// //                 updateStorage()
// //             }
// //         });

// //         //if title & content exists...
// //         if (newNote.title !== undefined && newNote.content !== undefined) {

// //             //if there is no note with that id -> add to notes[]
// //             if (!notes.find(note => note.id === newNote.id)) {
// //                 notes.push(newNote)
// //                 updateStorage()
// //                 res.send(newNote) //sendStatus(201)
// //             } else
// //                 res.send("note with that id already exists")

// //         } else
// //             res.send("no title or content") //sendStatus(400)

// //     } else
// //         res.sendStatus(401) //unauthorized
// // })

// // //GET single
// // router.get('/:id', function (req: Request, res: Response) {

// //     //AUTHORIZATION
// //     const authData = req.headers.authorization
// //     const token = authData?.split(' ')[1] ?? ""
// //     const payload = jwt.verify(token, secret)

// //     const id = +req.params.id

// //     //if true => user authorized to:
// //     if (payload !== undefined) {

// //         //if note with that id exists => show single note
// //         if (notes.find(note => note.id == id) !== undefined)
// //             res.send(notes.find(note => note.id == id)) //sendStatus(200)
// //         else
// //             res.send("note with that id dont exists")

// //     } else
// //         res.sendStatus(401) //unauthorized
// // })

// // //GET all
// // router.get('/', function (req: Request, res: Response) {

// //     //AUTHORIZATION
// //     const authData = req.headers.authorization
// //     const token = authData?.split(' ')[1] ?? ""
// //     const payload = jwt.verify(token, secret)

// //     //if true => user authorized to:
// //     if (payload !== undefined) {

// //         //if notes exists in notes[] => show notes[]
// //         if (notes !== undefined)
// //             res.send(notes)
// //         else
// //             res.send("notes are empty") //sendStatus(400)

// //     } else
// //         res.sendStatus(401) //unauthorized
// // })

// // //PUT
// // router.put('/:id', function (req: Request, res: Response) {

// //     //AUTHORIZATION
// //     const authData = req.headers.authorization
// //     const token = authData?.split(' ')[1] ?? ""
// //     const payload = jwt.verify(token, secret)

// //     const id = +req.params.id

// //     //if true => user authorized to:
// //     if (payload !== undefined) {

// //         //if note with that id exists => edit specific note
// //         if (notes.find(note => note.id == id) !== undefined) {
// //             notes[notes.findIndex(note => note.id == id)] = req.body;
// //             res.send(req.body) //sendStatus(200)
// //         } else
// //             res.send("note with that id dont exists") //sendStatus(404)

// //     } else
// //         res.sendStatus(401) //unauthorized
// // })

// // //DELETE
// // router.delete('/:id', function (req: Request, res: Response) {

// //     //AUTHORIZATION
// //     const authData = req.headers.authorization
// //     const token = authData?.split(' ')[1] ?? ""
// //     const payload = jwt.verify(token, secret)

// //     const id = +req.params.id

// //     //if true => user authorized to:
// //     if (payload !== undefined) {

// //         //if note with that id exists => delete specific note
// //         if (notes.find(note => note.id == id) !== undefined) {
// //             res.send(notes.find(note => note.id == id))
// //             notes.splice(notes.findIndex(note => note.id == id), 1)
// //         } else
// //             res.send("note with that id dont exists") //sendStatus(404)

// //     } else
// //         res.sendStatus(401) //unauthorized
// // })

// export default router;