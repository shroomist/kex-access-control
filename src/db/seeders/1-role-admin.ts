import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Role', [{
      id: uuid(),
      name: 'admin'
    }])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Role', null, {})
  }
}
