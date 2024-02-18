const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    adm: {
        type: Boolean,
        required: true
    }
})


const Users = mongoose.model('User', usersSchema)

module.exports = Users