import { Sequelize } from 'sequelize-typescript'
import User from './models/users'
import Permission from './models/permissions'
import UserPermission from './models/userPermissions'
import Resource from './models/resources'
import ResourcePermission from './models/resourcePermissions'
import Role from './models/roles'

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
    Role,
    User,
    Permission,
    UserPermission,
    ResourcePermission,
    Resource
  ])
  return sqlz
}
