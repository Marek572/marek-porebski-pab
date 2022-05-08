import fs from 'fs'
import {Game} from './routes/games'
import {Genre} from './routes/genres'
import {Developer} from './routes/developers'
import {Publisher} from './routes/publishers'
import {Collection} from './routes/collections'
// import {User} from './auth'


async function readStorage(): Promise<void> {
    try {
        games = JSON.parse(await fs.promises.readFile("./src/storage/games.json", 'utf-8'))
        genres = JSON.parse(await fs.promises.readFile("./src/storage/genres.json", 'utf-8'))
        developers = JSON.parse(await fs.promises.readFile("./src/storage/developers.json", 'utf-8'))
        publishers = JSON.parse(await fs.promises.readFile("./src/storage/publishers.json", 'utf-8'))
        collections = JSON.parse(await fs.promises.readFile("./src/storage/collections.json", 'utf-8'))
        // users = JSON.parse(await fs.promises.readFile("./src/storage/users.json", 'utf-8'))
    } catch (err) {
        console.log(err)
    }
}

async function updateStorage(): Promise<void> {
    try {
        await fs.promises.writeFile("./src/storage/games.json", JSON.stringify(games))
        await fs.promises.writeFile("./src/storage/genres.json", JSON.stringify(genres))
        await fs.promises.writeFile("./src/storage/developers.json", JSON.stringify(developers))
        await fs.promises.writeFile("./src/storage/publishers.json", JSON.stringify(publishers))
        await fs.promises.writeFile("./src/storage/collections.json", JSON.stringify(collections))
        await fs.promises.writeFile("./src/storage/collections.json", JSON.stringify(collections))
        // await fs.promises.writeFile("./src/storage/users.json", JSON.stringify(users))
    } catch (err) {
        console.log(err)
    }
}

let games: Game[] = []
let genres: Genre[] = []
let developers: Developer[] = []
let publishers: Publisher[] = []
let collections: Collection[] = []
// let users: User[] = []

export {readStorage, updateStorage, games, genres, developers, publishers, collections, /*users*/}