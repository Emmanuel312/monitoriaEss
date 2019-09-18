const Post = require('../models/Post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = 
{
    async store(req,res,next)
    {
        try
        {
            const [ name, ext ] = req.file.filename.split('.')
            const filename = `${name}-${Date.now()}.${ext}`

            // redimensiona a foto
            await sharp(req.file.path).resize(500).toFile(path.resolve(req.file.destination,'resized',filename))
            // deleta a foto original
            fs.unlinkSync(req.file.path)


            const post = await Post.create({ ...req.body,image: `http://localhost:3000/files/${filename}`,userId: req.userId })
            res.json(post)
        }
        catch(err)
        {
            next(err)
        }
    },

    async index(req,res,next)
    {
        try
        {
            const posts = await Post.find({}).sort('-createdAt')

            res.json(posts)
        }
        catch(err)
        {
            next(err)
        }
    },

    async show(req,res,next)
    {
        try
        {
            const { id } = req.params
            const post = await Post.findById(id)
            
            if(!post) return res.status(400).json({ error: 'Post nao encontrado' })

            res.json(post)
        }
        catch(err)
        {
            next(err)
        }
    },

    async update(req,res,next)
    {
        try
        {
            
            const { id } = req.params
            const { title,content } = req.body
            const post = await Post.findById(id)

            if(!post) return res.status(400).json({ error: 'Post nao encontrado' })
            if(post.userId != req.userId) return res.status(401).json({ error: 'Esse post nao te pertence' })

            post.title = title
            post.content = content
            await post.save()
            
            res.json(post)
        }
        catch(err)
        {
            next(err)
        }
    },

    async delete(req,res,next)
    {
        try
        {
            const { id } = req.params
            const post = await Post.findById(id)
            
            if(!post) return res.status(400).json({ error: 'Post nao encontrado' })
            console.log(post.userId + ' ' + post.userId )
            if(post.userId != req.userId) return res.status(401).json({ error: 'Esse post nao te pertence' })
            
            await post.remove()


            res.json({ msg: 'Post Deletado' })
        }
        catch(err)
        {
            next(err)
        }
    }
}