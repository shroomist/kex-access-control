import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import Role from '../models/roles'
import { initDB } from '../index'
import User from '../models/users'

export default {

  up: async (queryInterface: QueryInterface) => {
    const sqlz = initDB(process.env.KEX_DB_URL, [Role])
    const adminRole = await Role.findOne({ where: { name: 'admin' } })
    const moderatorRole = await Role.findOne({ where: { name: 'moderator' } })

    sqlz.close()

    return queryInterface.bulkInsert('User', [
      {
        id: uuid(),
        name: 'admin',
        roleId: adminRole.id,
      },
      {
        id: uuid(),
        name: 'moder',
        roleId: moderatorRole.id,
      }

    ])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('User', null, {})
    // TODO: fix identifier to not dump all users
  }
}
