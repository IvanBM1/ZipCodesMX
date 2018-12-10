require('dotenv').config()

module.exports = {
    node_env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '4000',
    host: process.env.HOST || 'http://localhost'
}