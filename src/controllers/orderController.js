const repository = require('../repositories/OrderRepository')
const Guid = require('guid')

const authService = require('../services/authService')

module.exports = {

    async create(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        //retorna json atrelado ao token com dados do customer
        const data = await authService.decodeToken(token)

        try {
            await repository.create({
                customer: data.id,
                number: Guid.raw().substring(0, 6),
                items: req.body.items
            })

            return res.status(201).send('Pedido realizado com sucesso!')
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

    async getOrders(req, res, next) {
        try {
            const order = await repository.get()
            return res.status(200).send(order)

        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    },

    async getOrdersByUserLogged(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        //retorna json atrelado ao token com dados do customer
        const data = await authService.decodeToken(token)
        try {
            const order = await repository.getOrders(data)

            return res.status(200).send(order)
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })
        }
    }
}