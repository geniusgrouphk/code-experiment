import mongoose from 'mongoose'

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    __v: { type: Number, select: false }
})

module.exports = mongoose.model('author', authorSchema)
