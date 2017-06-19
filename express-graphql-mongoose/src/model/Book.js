import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'authors' }],
    __v: { type: Number, select: false }
})

module.exports = mongoose.model('book', bookSchema)
