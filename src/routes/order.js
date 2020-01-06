const express = require('express')
const router = express.Router()

const controller = require('../controllers/orderController')

const authService = require('../services/authService')

router.post('/', authService.authorize, controller.create)

// router.put('/:id', controller.update)

// router.delete('/delete/:id', controller.delete)

//router.get('/', authService.authorize, controller.getOrders)

// router.get('/:slug', controller.getProductsBySlug)

router.get('/', authService.authorize, controller.getOrdersByUserLogged)

// router.get('/tags/:tag', controller.getProductsByTag)

module.exports = router
