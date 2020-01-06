const Product = require('../models/Product')

module.exports = {

    async get() {
        return await Product.find({ active: true }, 'title price slug image').sort('-createdAt')
    },
    async getBySlug(slug) {
        return await Product.findOne({ active: true, slug }, 'title description price slug tags').sort('-createdAt')
    },
    async getByID(id) {
        return await Product.findById(id).sort('-createdAt')
    },
    async getByTag(tag) {
        return await Product.find({ active: true, tags: tag }).sort('-createdAt')
    },
    async create(data) {
        const { title, slug, description, price, active, tags, image } = data

        await  Product.create({
            title,
            slug,
            description,
            price,
            active,
            tags,
            image
        })
    },
    async update(id, data) {

        await Product.findByIdAndUpdate(id, {
            $set: {
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
    },
    async delete(id) {
        await Product.findByIdAndRemove(id)
    }

}