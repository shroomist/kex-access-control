import { Sequelize } from 'sequelize-typescript'
import Users from './models/users'
import Permissions from './models/permissions'
import UserPermissions from './models/userPermissions'

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
    logging: false,
    operatorsAliases: Sequelize.Op as any,
  })

  sqlz.addModels([Users, Permissions, UserPermissions])
  return sqlz
}
