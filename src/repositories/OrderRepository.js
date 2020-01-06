const Order = require('../models/Order')

module.exports = {

    async get() {
        return await Order.find()
            .populate('customer', 'name')
            .populate('items.product', 'price slug title')
            .sort('-createdAt')
    },
    async getOrders(data) {
        return await Order.find({ customer: data.id })
            .populate({
                path: 'customer',
                select: 'name'
            })
            .populate('items.product', 'price slug title')
            .sort('-createdAt')

    },
    async create(data) {
        const { customer, items, number } = data

        await Order.create({
            customer,
            items,
            number
        })
    },

}