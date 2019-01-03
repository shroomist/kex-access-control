import Sequelize from 'sequelize'
import config from './dbconfig.json'

const postgresAddr = `postgres://${config.user}:${config.password}\
@${config.host}/${config.dbname}`

const getSequelizeInstance = () => new Sequelize(postgresAddr)

export { getSequelizeInstance }
