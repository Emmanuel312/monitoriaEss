const Post = require('../models/Post')
const User = require('../models/User')

module.exports =
{
    // posts do usuario logado ordenado pelo mais recente 
    async me(req,res,next)
    {
        try
        {
            const posts = await Post.find({ userId: req.userId }).sort('-createdAt')
            // retorna os posts com a quantidade de likes
            const postsInfo = posts.map(post => 
            {
                return {
                    ...post._doc,
                    likesLength: post.likes.length
                }
            })

            res.json(postsInfo)
        }
        catch(err)
        {
            next(err)
        }
        
    },
    // feed com os seus posts e dos seus following
    async feed(req,res,next)
    {
        try
        {
            const { following } = await User.findById(req.userId)
            // query que retorna os posts desde que os donos estejam nos followings ou seja do usuario logado
            const posts = await Post.find({ userId: { $in: [req.userId,following] } }).sort('-createdAt')
            const postsInfo = posts.map(post => 
            {
                return {
                    ...post._doc,
                    likesLength: post.likes.length
                }
            })

            res.json(postsInfo)
        }
        catch(err)
        {
            next(err)
        }
        
    }
}