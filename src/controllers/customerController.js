const repository = require('../repositories/CustomerRepository')
const emailService = require('../services/emailService')
const ValidationContract = require('../validators/FluentValidator')
const md5 = require('md5')
const authService = require('../services/authService')

module.exports = {

    async create(req, res, next) {
        const contract = new ValidationContract()
        contract.hasMinLen(req.body.name, 3, 'O nome deve possuir pelo menos 3 caracteres')
        contract.isEmail(req.body.email, 3, 'Email inválido')
        contract.hasMinLen(req.body.password, 6, 'A senha deve possuir pelo menos 6 caracteres')

        //Se os dados foram inválidos
        if (!contract.isValid()) {
            return res.status(400).send(contract.errors()).end()
        }

        try {
            await repository.create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY),
                roles: req.body.roles

            })
            emailService.send(req.body.email, 'Bem vindo!', global.EMAIL_TMPL.replace('{0}', req.body.name))

            return res.status(201).send('Cliente cadastrado com sucesso!')
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    },
    async authenticate(req, res, next) {
        try {
            const customer = await repository.authenticate({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            })

            if (!customer) {
                return res.status(404).send({ message: 'Usuário ou senha inválidos' })
            }

            const token = await authService.generateToken({
                id: customer._id,
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            })

            return res.status(201).send({
                token: token,
                data: {
                    email: customer.email,
                    name: customer.name
                }
            })
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    },
    async refreshToken(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token)

        try {
            const customer = await repository.getById(data.id)

            if (!customer) {
                return res.status(404).send({ message: 'Cliente não encontrado' })
            }

            const tokenData = await authService.generateToken({
                id: customer._id,
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            })

            return res.status(201).send({
                token: tokenData,
                data: {
                    email: customer.email,
                    name: customer.name
                }
            })
        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    },

    // async update(req, res, next) {

    //     try {
    //         await repository.update(req.params.id, req.body)

    //         return res.status(200).send('Produto alterado com sucesso')

    //     } catch (error) {
    //         res.status(500).send({ message: 'Falha ao processar a requisição' + error })

    //     }

    // },

    // async delete(req, res, next) {
    //     try {
    //         await repository.delete(req.params.id)

    //         return res.status(200).send('Produto deletado com sucesso!')
    //     } catch (error) {
    //         res.status(500).send({ message: 'Falha ao processar a requisição' + error })
    //     }
    // },

    async getCustomers(req, res, next) {
        try {
            const customer = await repository.get()
            return res.status(200).send(customer)

        } catch (error) {
            res.status(500).send({ message: 'Falha ao processar a requisição' + error })

        }
    }
}