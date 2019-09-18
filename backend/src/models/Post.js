const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
{
    title: 
    {
        type: String,
        required: true
    },
    content:
    {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User'}],
    userId:
    {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: String

}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)