import fs from 'fs'
import {Note} from './notes'
import {Tag} from './tags'
import {User} from './users'

async function readStorage(): Promise<void> {
    try {
        notes = JSON.parse(await fs.promises.readFile("./src/storage/notes.json", 'utf-8'))
        tags = JSON.parse(await fs.promises.readFile("./src/storage/tags.json", 'utf-8'))
        users = JSON.parse(await fs.promises.readFile("./src/storage/users.json", 'utf-8'))
    } catch (err) {
        console.log(err)
    }
}

async function updateStorage(): Promise<void> {
    try {
        await fs.promises.writeFile("./src/storage/notes.json", JSON.stringify(notes))
        await fs.promises.writeFile("./src/storage/tags.json", JSON.stringify(tags))
        await fs.promises.writeFile("./src/storage/users.json", JSON.stringify(users))
    } catch (err) {
        console.log(err)
    }
}

let notes: Note[] = []
let tags: Tag[] = []
let users: User[] = []

export {readStorage, updateStorage, notes, tags, users}