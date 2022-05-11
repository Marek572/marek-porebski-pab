import jwt from 'jsonwebtoken'

export function verifyUser (req,res,next) {

    const token = req.headers.authorization?.split(' ')[1]
    if(!token)
        return res.status(401).send('Acces denied')

    try {
        const verified = jwt.verify(token, 'superTopSecret')
        res.locals.verified = verified
        //console.log(token)
        next()
    }catch(err) {
        return res.status(400).send('Invalid token')
    }
}