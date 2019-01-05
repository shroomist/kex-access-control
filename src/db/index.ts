import { Sequelize } from 'sequelize-typescript'
import User from './models/user'

type DbConfig = {
  host: string,
  username: string,
  password: string,
  port: number,
  database: string,
  dialect: string
}

export const getSequel = (config: DbConfig) => {
  const sqlz = new Sequelize({
    ...config,
    operatorsAliases: Sequelize.Op as any,

    // modelPaths: [path.join(__dirname, "../models")],
  })

  sqlz.addModels([User])
  return sqlz
}
