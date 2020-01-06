const repository = require('../repositories/ProductRepository')
const ValidationContract = require('../validators/FluentValidator')
const azureStorage = require('azure-storage')
const Guid = require('guid')
const config = require('../config')

module.exports = {

    async create(req, res, next) {
        const contract = new ValidationContract()
        contract.hasMinLen(req.body.title, 3, 'O título deve possuir pelo menos 3 caracteres')
        contract.hasMinLen(req.body.slug, 3, 'O slug deve possuir pelo menos 3 caracteres')
        contract.hasMinLen(req.body.description, 3, 'A descrição deve possuir pelo menos 3 caracteres')
        contract.isRequired(req.body.price, 'O preço é obrigatório')

        if (!contract.isValid()) {
            return res.status(400).send(contract.errors()).end()
        }
        try {
            const blobService = azureStorage.createBlobService(config.containerConnectionString)

            let filename = Guid.raw().toString() + '.jpg'
            let rawdata = req.body.image
            let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
            let type = matches[1]
            let buffer = new Buffer(matches[2], 'base64')

            await blobService.createAppendBlobFromText('product-images', filename, buffer, { contentType: type },
                function (error, result, response) {
                    if (error) {
                        filename = 'default-product.png'
                    }
                })

            await repository.create({
                title: req.body.title,
                slug: req.body.slug,
                description: req.body.description,
                price: req.body.price,
                active: true,
                tags: req.body.tags,
                image: 'https://storenode.blob.core.windows.net/product-images/' + filename
            })

            return res.status(201).send('Produto cadastrado com sucesso!')
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição ' + error })

        }
    },

    async update(req, res, next) {

        try {
            await repository.update(req.params.id, req.body)

            return res.status(200).send('Produto alterado com sucesso')

        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }

    },

    async delete(req, res, next) {
        try {
            await repository.delete(req.params.id)

            return res.status(200).send('Produto deletado com sucesso!')
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })
        }
    },

    async getProducts(req, res, next) {
        try {
            const products = await repository.get()
            return res.status(200).send(products)

        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    },

    async getProductsBySlug(req, res, next) {
        try {
            const products = await repository.getBySlug(req.params.slug)

            return res.status(200).send(products)
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })
        }
    },

    async getProductsByID(req, res, next) {
        try {
            const products = await repository.getByID(req.params.id)

            return res.status(200).send(products)

        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    },

    async getProductsByTag(req, res, next) {
        try {
            const products = await repository.getByTag(req.params.tag)

            return res.status(200).send(products)
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    }

}