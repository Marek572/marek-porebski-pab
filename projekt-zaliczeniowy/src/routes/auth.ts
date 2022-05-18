const express = require('express')
const router = express.Router()
const UserModel = require('../models/UserModel')
const CollectionModel = require('../models/CollectionModel')
import {registerValidation, loginValidation} from '../validation'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

router.post('/register', async (req, res) => {

    //validation
    const {error} = registerValidation(req.body)
    //FIXME: nie wystepuje nagle? CRASH on error "TSerr: converting circular structure to json"
    if(error)
        return res.status(400).send(error.details[0].message)

    //user data
    const {username, email, password} = req.body

    //username check
    const usernameExists = await UserModel.findOne({username: username})
    if(usernameExists)
        return res.status(400).send('User with username: '+username+' already exists')

    //email check
    const emailExists = await UserModel.findOne({email: email})
    if(emailExists)
        return res.status(400).send('User with email: '+email+' already exists')

    //pass encryption
    const salt = await bcrypt.genSalt(15)
    const hashPass = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        username: username,
        email: email,
        password: hashPass
    })
    const newCollection = new CollectionModel({
        username: username,
        beaten: [],
        planned: []
    })

    //save user
    try{
        const saveUser = await newUser.save()
        const saveCollection = await newCollection.save()
        res.status(201).send('user '+saveUser.username+' successfully registered')
    }catch(err){
        res.status(400).send(err)
    }
})


router.post('/login', async (req, res) => {

    //validation
    const {error} = loginValidation(req.body)
    //FIXME: CRASH on error "TSerr: converting circular structure to json"
    if(error)
        return res.status(400).send(res.send(error.details[0].message))

    //user data
    const {username, password} = req.body

    const user = await UserModel.findOne({username: username})
    if(!user)
        return res.status(400).send('User with username '+username+' not found')

    const validPass = await bcrypt.compare(password, user.password)
    if(!validPass)
        return res.status(400).send('Invalid password')

    //token
    const token = jwt.sign({username}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
    //FIXME: token into header
    // res.setHeader('Authorization', token)
    console.log(token)

    //output
    res.status(202).send('Logged in')
})


router.put('/logout',  async (req, res) => {

    res.status(404).send('err')
    // res.send('Logged out')

})

export default router