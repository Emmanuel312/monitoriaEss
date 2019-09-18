const User = require('../models/User')

module.exports = 
{
    async store(req,res,next)
    {
        try
        {
            const { id } = req.params
            const me = await User.findById(req.userId)
            const user = await User.findById(id)
            
            if(!user) res.status(400).json({error: "voce nao pode seguir um usuario que nao existe" })
            if(me.following.indexOf(user._id) !== -1) res.status(400).json({error: "voce ja segue esse usuario" })

            me.following.push(user._id)
            user.followers.push(me._id)
            await me.save()
            await user.save()

            res.json({ me,user })
        }
        catch(err)
        {
            next()
        }
    },
    async destroy(req,res,next)
    {
        try
        {
            const { id } = req.params
            const me = await User.findById(req.userId)
            const user = await User.findById(id)
            
            if(!user) res.status(400).json({error: "voce nao pode seguir um usuario que nao existe" })
            if(me.following.indexOf(user._id) === -1) res.status(400).json({error: "voce nao segue esse usuario" })
            
            me.following.splice(me.following.indexOf(user._id),1)
            user.followers.splice(user.followers.indexOf(me._id),1)
            await me.save()
            await user.save()

            res.json({ me,user })
        }
        catch(err)
        {
            next()
        }
    }
}