import { QueryInterface } from 'sequelize'
import uuid from 'uuid/v4'
import { PermissionsEnum } from '../models/permissions'

export default {

  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Permission', [
      {
        id: uuid(),
        name: PermissionsEnum.create,
      },
      {
        id: uuid(),
        name: PermissionsEnum.read,
      },
      {
        id: uuid(),
        name: PermissionsEnum.update,
      },
      {
        id: uuid(),
        name: PermissionsEnum.delete,
      },
    ])
  },

  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Permission', null, {})
  }
}
