import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import Roles from '../models/roles'
import { getSequel } from '../index'
import Users from '../models/users'

let sqlz

export default {

  up: async (queryInterface: QueryInterface) => {
    sqlz = getSequel(process.env.KEX_DB_URL)
    sqlz.addModels([Roles])
    const adminRole = await Roles.findOne({ where: { name: 'admin' } })
    return queryInterface.bulkInsert('Users', [{
      id: uuid(),
      name: 'admin',
      role: adminRole.id,
    }])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
