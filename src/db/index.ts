import { Sequelize } from 'sequelize-typescript'
import Users from './models/users'
import Permissions from './models/permissions'
import UserPermissions from './models/userPermissions'
import Resources from './models/resources'
import ResourcePermissions from './models/resourcePermissions'

type DbConfig = {
  host: string,
  username: string,
  password: string,
  database: string,
  dialect: string
}

export const getSequel = (dbUrl: string) => {
  const sqlz = new Sequelize({
    url: dbUrl,
    logging: false,
    operatorsAliases: Sequelize.Op as any,
  })

  sqlz.addModels([
    Users,
    Permissions,
    UserPermissions,
    ResourcePermissions,
    Resources
  ])
  return sqlz
}
