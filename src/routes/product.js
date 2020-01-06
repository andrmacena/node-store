const express = require('express')
const router = express.Router()

const controller = require('../controllers/productController')

const authService = require('../services/authService')

router.post('/admin', authService.isAdmin, controller.create)

router.put('/admin/:id', authService.isAdmin, controller.update)

router.delete('/admin/delete/:id', authService.isAdmin, controller.delete)

router.get('/', controller.getProducts)

router.get('/:slug', controller.getProductsBySlug)

router.get('/admin/:id', authService.isAdmin, controller.getProductsByID)

router.get('/tags/:tag', controller.getProductsByTag)

module.exports = router
