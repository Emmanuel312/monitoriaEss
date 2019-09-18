const Post = require('../models/Post')

module.exports = 
{
    async handleLike(req,res)
    {
        try
        {
            const { id } = req.params
            const post = await Post.findById(id)

            if(!post) return res.status(400).json({ error: 'Post nao encontrado' })

            // post ja curtido pelo usuario
            if(post.likes.indexOf(req.userId) !== -1)
            {
                // remove o like do usuario atual
                post.likes.splice(post.likes.indexOf(req.userId),1)
                await post.save()

                res.json(post)
            }
            // post nao curtido pelo usuario
            else
            {
                // adiciona o like do usuario atual
                post.likes.push(req.userId)
                await post.save()

                res.json(post)
            }
        }
        catch(err)
        {   
            next(err)
        }
    },


}