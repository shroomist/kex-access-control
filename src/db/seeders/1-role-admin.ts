import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Roles', [{
      id: uuid(),
      name: 'admin'
    }])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {})
  }
}
