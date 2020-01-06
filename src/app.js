const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')

const app = express()

const mongoose = require('mongoose')

mongoose.connect(config.connectionString,
    { useNewUrlParser: true })

const indexRoute = require('./routes/index')
const productRoutes = require('./routes/product')
const customerRoutes = require('./routes/customer')
const orderRoutes = require('./routes/order')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoutes)
app.use('/customers', customerRoutes)
app.use('/orders', orderRoutes)

module.exports = app