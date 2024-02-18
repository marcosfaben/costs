const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
        },
        name: { 
            type: String,
            required: false
        }
    },
    cost: {
        type: Number,
        required: true
    },
    services: {
        type: Array,
        required: false
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Projects = mongoose.model('Project', projectSchema)

module.exports = Projects