import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import Role from '../models/roles'
import { initDB } from '../index'
import User from '../models/users'

let sqlz

export default {

  up: async (queryInterface: QueryInterface) => {
    sqlz = initDB(process.env.KEX_DB_URL, [Role])
    const adminRole = await Role.findOne({ where: { name: 'admin' } })
    return queryInterface.bulkInsert('User', [{
      id: uuid(),
      name: 'admin',
      roleId: adminRole.id,
    }])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('User', null, {})
  }
}
