import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'

export default {

  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Permissions', [
      {
        id: uuid(),
        name: 'create',
      },
      {
        id: uuid(),
        name: 'read',
      },
      {
        id: uuid(),
        name: 'update',
      },
      {
        id: uuid(),
        name: 'delete',
      },
    ])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Permissions', null, {})
  }
}
