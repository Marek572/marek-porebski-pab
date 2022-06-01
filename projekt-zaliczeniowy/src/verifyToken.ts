import jwt from 'jsonwebtoken'
const UserModel = require('./models/UserModel')

export async function verifyUser (req,res,next) {

    const token = req.headers.authorization?.split(' ')[1]
    const topSecret = process.env.TOKEN_SECRET
    if(!token)
        return res.status(401).send('Acces denied')

    try {
        const verified = jwt.verify(token, topSecret)
        const user = await UserModel.findOne({username: verified.username})
        if(user.hash == 'expired')
            return res.status(400).send('Session expired')
        res.locals.verified = verified
        next()
    }catch(err) {
        return res.status(400).send(err)
    }
}