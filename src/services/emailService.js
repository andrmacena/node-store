const config = require('../config')
const sendgrid = require('sendgrid')(config.sendgridKey)

module.exports = {
    async send(to, subject, body){
        sendgrid.send({
            to: to,
            from: 'andremacena@gmail.com',
            subject: subject,
            html: body
        })
    }
}