import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import Permissions from '../models/permissions'
import Users from '../models/users'
import { getSequel } from '../index'
import config from '../config.json'

let sqlz

export default {

  up: async (queryInterface: QueryInterface) => {
    sqlz = getSequel(config.prod)
    sqlz.addModels([Permissions, Users])
    const allPermissions = await Permissions.findAll({ attributes: ['id'] })
    const adminUser = await Users.findOne({ where: { name: 'admin' }, attributes: ['id'] })
    const adminPermissions = allPermissions.map((permission: { id: string }) => {
      return { id: uuid(), user: adminUser.id, permission: permission.id }
    })
    return queryInterface.bulkInsert('UserPermissions', adminPermissions)
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('UserPermissions', null, {})
  }
}
