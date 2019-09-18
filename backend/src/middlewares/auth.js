const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

module.exports = async (req,res,next) =>
{
    const authHeader = req.headers.authorization

    if(!authHeader) res.status(401).json({error: "Sem token"})
    
    const parts = authHeader.split(' ')

    if(parts.length !== 2) res.status(401).json({error: "token com tamanho errado"})

    const [ bearer, token ] = parts

    if(bearer !== 'Bearer') res.status(401).json({error: "token no formato errado"})

    jwt.verify(token,secret, (err, decoded) =>
    {
        if(err) return res.status(401).json({error: "token invalido"})
        console.log(decoded)
        req.userId = decoded.id
        next()
    }) 
    
   
}