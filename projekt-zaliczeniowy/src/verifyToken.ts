import jwt from 'jsonwebtoken'

export function verifyUser (req,res,next) {

    const token = req.headers.authorization?.split(' ')[1]
    const topSecret = process.env.TOKEN_SECRET
    if(!token)
        return res.status(401).send('Acces denied')

    try {
        const verified = jwt.verify(token, topSecret)
        res.locals.verified = verified
        next()
    }catch(err) {
        return res.status(400).send('Invalid token')
    }
}
