import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import Role from '../models/roles'
import { initDB } from '../index'
import User from '../models/users'
import Permission from '../models/permissions'
import UserPermission from '../models/userPermissions'

export default {

  up: async () => {
    const sqlz = initDB(process.env.KEX_DB_URL, [User, Permission, UserPermission, Role])
    const adminRole = await Role.findOne({ where: { name: 'admin' } })
    const moderatorRole = await Role.findOne({ where: { name: 'moderator' } })

    await Promise.all([
      User.create({
        id: uuid(),
        name: 'admin',
        roleId: adminRole.id,
      }),
      User.create({
        id: uuid(),
        name: 'moder',
        roleId: moderatorRole.id,
      })
    ])

    sqlz.close()
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('User', null, {})
    // TODO: fix identifier to not dump all users
  }
}
