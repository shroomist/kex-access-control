import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import Permission from '../models/permissions'
import User from '../models/users'
import { initDB } from '../index'

let sqlz

export default {

  up: async (queryInterface: QueryInterface) => {
    sqlz = initDB(process.env.KEX_DB_URL, [Permission, User])
    const allPermissions = await Permission.findAll({ attributes: ['id'] })
    const adminUser = await User.findOne({ where: { name: 'admin' }, attributes: ['id'] })
    const adminPermissions = allPermissions.map((permission: { id: string }) => {
      return { id: uuid(), userId: adminUser.id, permissionId: permission.id }
    })
    return queryInterface.bulkInsert('UserPermission', adminPermissions)
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('UserPermission', null, {})
  }
}
