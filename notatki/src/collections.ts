// const express = require('express')
// const router = express.Router()
// const CollectionModel = require('../models/CollectionModel')
// import { collectionValidation } from '../validation'
// import { verifyUser } from '../verifyToken'

// router.use((req, res, next) => {
//     verifyUser(req,res,next)
// })


//GET all collections
// router.get('/', (req, res) => {

//     //TODO: require admin privileges

//     //output
//     if(collections.length>0)
//         res.status(200).send(collections);
//     else
//         res.status(404).send("collections is empty")

// })


// //GET single public collection
// router.get('/collection/:username', (req, res) =>{

//     const username = req.params.username
//     //TODO: check czy tmp dziala wg xd
//     const tmp = collections.find(collection => collection.username == username)


//     //TODO: if admin privileges => skip checking if visable

//     //output
//     if(tmp !== undefined)
//         if(tmp.visible === true)
//             res.status(200).send(tmp)
//         else
//             res.status(404).send(username+" have private collection") //FIXME: not siur czy status 404
//     else
//         res.status(404).send(username + "collection not found")

// })


// //TODO: GET current user collection
// router.get('/collection/:username', (req, res) => {



// })

// //Bez post'a do tworzenia, bo kolekcja tworzy sie przy rejerstracji konta
// //Bez delete'a, bo kolekcja stworzona na stale; ewentualne usuwanie przy usunieciu konta
// //TODO: tworzenie kolekcji przy rejerstracji xD^

// //PUT edit visability
// router.put('/colletion/:username', (req, res) => {

//     const username = req.params.username
//     let tmp = collections.find(collection => collection.username == username)

//     //FIXME: current user edit
//     //output
//     if(tmp !== undefined){
//         tmp.visible = req.body.visible
//         updateStorage()
//         res.status(200).send("You edited viability of your collection")
//     }
//     else
//         res.status(400).send("You can only edit your collection") //FIXME: nwm jaki status

// })


export default router

//NOTES:
//FIXME: current user == param username