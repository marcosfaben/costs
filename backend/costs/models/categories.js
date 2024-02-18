const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Categories = mongoose.model('Category', categorySchema)

module.exports = Categories