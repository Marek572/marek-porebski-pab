// import {notes} from './storage'
// import { ChangeStreamDocument } from 'mongodb'
// import mongoose from 'mongoose'


// const connString = 'mongodb+srv://pab:XX8pGVYXOUl22YUy@cluster0.1zrl4.mongodb.net/Cluster0?retryWrites=true&w=majority'


// const noteSchema = new mongoose.Schema({
//     user: String,
//     title: String,
//     content: String,
//     visibility: Boolean,
//     tags: [String]
// })


// export async function main(){

//     //db connection
//     console.log('Connecting to mongo');
//     const db = await mongoose.connect(connString)
//     console.log('Mongo Connected!')

//     // //model => schema
//     // const noteModel = mongoose.model('notes', noteSchema)

//     // //adding new note
//     // const newNote = new noteModel({
//     //     title: 'testNote',
//     //     content: 'fromMongoose',
//     //     private: true,
//     //     tags: ['testTag', 'tag1']
//     // })

//     // //save note
//     // const saveRet = await newNote.save();
//     // console.log('SAVE - new note id: ', newNote.id);

//     // //update note
//     // newNote.title = `updated note ${newNote.id}`
//     // await newNote.save();
//     // console.log('UPDATE - new note updated title: ', newNote.title);

//     // //del note
//     // const delRet = await noteModel.deleteMany({ private: false })
//     // console.log('NOTE DELETE,', delRet)

//     // //all notes
//     // const notes = await noteModel.find();
//     // console.log(`NOTES Colection ${notes.length}:`, notes)
// }

// function onNotesChange(notes: ChangeStreamDocument) {
//     console.log('NOTES CHANGE!', notes)
// }