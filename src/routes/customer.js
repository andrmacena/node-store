const express = require('express')
const router = express.Router()

const controller = require('../controllers/customerController')
const authService = require('../services/authService')

router.post('/', controller.create)

router.post('/authenticate', controller.authenticate)

router.post('/refresh-token', authService.authorize, controller.refreshToken)

// router.put('/:id', controller.update)

// router.delete('/delete/:id', controller.delete)

router.get('/admin', authService.isAdmin, controller.getCustomers)

// router.get('/:slug', controller.getProductsBySlug)

// router.get('/admin/:id', controller.getProductsByID)

// router.get('/tags/:tag', controller.getProductsByTag)

module.exports = router
