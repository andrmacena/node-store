global.SALT_KEY = '<YOUR SALT KEY HERE>'
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong> seja bem vindo à Node Store'

module.exports = {
    connectionString: 'mongodb+srv://semana:rocketseat@cluster0-ocqjp.mongodb.net/test?retryWrites=true&w=majority',
    sendgridKey:'<YOUR SENDGRID KEY HERE>',
    containerConnectionString: '<YOUR AZURE STORAGE KEY HERE>'
}