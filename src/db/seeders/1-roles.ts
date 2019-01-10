import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Role', [
      {
        id: uuid(),
        name: 'user'
      },
      {
        id: uuid(),
        name: 'admin'
      },
      {
        id: uuid(),
        name: 'moderator'
      }])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Role', null, {})
  }
}
