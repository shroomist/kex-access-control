import { Sequelize } from 'sequelize-typescript'
import Users from './models/users'

type DbConfig = {
  host: string,
  username: string,
  password: string,
  database: string,
  dialect: string
}

export const getSequel = (config: DbConfig) => {
  const sqlz = new Sequelize({
    ...config,
    operatorsAliases: Sequelize.Op as any,

    // modelPaths: [path.join(__dirname, "../models")],
  })

  sqlz.addModels([Users])
  return sqlz
}
