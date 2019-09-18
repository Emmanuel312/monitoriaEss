const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth')

const UserSchema = new mongoose.Schema(
{
    username:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:
    {
        type: String,
        required: true
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

// hooks == triggers
UserSchema.pre('save', async function(next)
{
    if(!this.isModified('password')) next()
    this.password = await bcryptjs.hash(this.password,8)
})

// methods
UserSchema.methods = 
{
    compareHash(password)
    {
        return bcryptjs.compare(password,this.password)
    },
    generateToken()
    {
        return jwt.sign({id: this._id }, secret, { expiresIn: '1d' })
    }

}


module.exports = mongoose.model('User', UserSchema)