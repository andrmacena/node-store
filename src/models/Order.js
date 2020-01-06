const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    number: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    items: [{
        quantity: {
            type: Number,
            require: true,
            default: 1
        },
        price: {
            type: Number,
            require: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }]
},
    { timestamps: true })

module.exports = mongoose.model('Order', schema)

