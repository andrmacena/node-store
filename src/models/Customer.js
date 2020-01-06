const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
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
    roles: [{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }],

},
    { timestamps: true })

module.exports = mongoose.model('Customer', schema)

