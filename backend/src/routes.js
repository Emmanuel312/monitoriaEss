const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)
const routes = express.Router()
const authController = require('./controllers/authController')
const authMiddleware = require('./middlewares/auth')
const followController = require('./controllers/followController')
const postController = require('./controllers/postController')
const likeController = require('./controllers/likeController')
const feedController = require('./controllers/feedController')

routes.post('/signup', authController.signup)
routes.post('/signin', authController.signin)


routes.use(authMiddleware)
// rotas autenticadas
routes.put('/follow/:id', followController.store)
routes.put('/unfollow/:id', followController.destroy)
// CRUD post
routes.post('/post', upload.single('image'),postController.store)
routes.get('/post/:id', postController.show)
routes.get('/post', postController.index)
routes.put('/post/:id', postController.update)
routes.delete('/post/:id', postController.delete)
// Likes
routes.put('/like/:id', likeController.handleLike)
// feed
routes.get('/feed/me', feedController.me)
routes.get('/feed', feedController.feed)



module.exports = routes 