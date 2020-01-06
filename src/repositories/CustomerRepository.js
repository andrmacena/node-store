const Customer = require('../models/Customer')

module.exports = {

    async get() {
        return await Customer.find().sort('-createdAt')
    },
    async create(data) {
        const { name, email, password, roles } = data

        await Customer.create({
            name,
            email,
            password,
            roles
        })
    },
    async authenticate(data) {
        const res = await Customer.findOne({
            email: data.email,
            password: data.password
        })

        return res
    },
    async getById(id) {
        const res = await Customer.findById(id)

        return res
    }

}