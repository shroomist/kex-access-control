const Sequelize = require('sequelize')
const config = require('./dbconfig')

const postgresAddr = `postgres://${config.user}:${config.password}\
@${config.host}/${config.dbname}`

const getSequelizeInstance = () => new Sequelize(postgresAddr)

module.exports = getSequelizeInstance
