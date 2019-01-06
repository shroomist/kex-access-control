import { QueryInterface, STRING, UUID, fn } from 'sequelize'

const KEY = {
  type: UUID,
  notNull: true
}

const PRIMARY = {
  ...KEY,
  primaryKey: true,
  default: fn('uuid_generate_v4')
}

export default {
  up: async (db: QueryInterface): Promise<any> => {

    await db.createTable('UserPermissions', {
      id: PRIMARY,
      user: {
        ...KEY,
        references: {
          model: 'Users'
        }
      },
      permission: {
        ...KEY,
        references: {
          model: 'Permissions'
        }
      }
    })

    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    await db.dropTable('UserPermissions')
    return null
  },
  _meta: { version: 1 }
}
