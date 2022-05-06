const express = require('express')
const router = express.Router()
import { readStorage, updateStorage, users} from './storage'

router.use((req, res, next) => {
    next()
})

export interface User {
    id?: number,
    login: string,
    password: string
}