const User = require('../models/User')


module.exports = 
{
    async signup(req,res,next)
    {
        try
        {
            const { email } = req.body

            if(await User.findOne({ email })) return res.status(400).json({error: "usuario já existe"})
            
            const user = await User.create(req.body)
            res.json({ user,token: user.generateToken() })
    
        }
        catch(err)
        {
            next(err)
        }
    },

    async signin(req,res)
    {
        try
        {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if(!user) res.status(400).json({error: "email não cadastrado"})
            if(!await user.compareHash(password)) res.status(400).json({error: "senha incorreta"})

            res.json({ user, token: user.generateToken() })
        }
        catch(err)
        {
            next(err)
        }
    },
}