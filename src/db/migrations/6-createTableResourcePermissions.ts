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

    await db.createTable('ResourcePermissions', {
      id: PRIMARY,
      resource: {
        ...KEY,
        references: {
          model: 'Resources'
        }
      },
      user_permission: {
        ...KEY,
        references: {
          model: 'UserPermissions'
        }
      }
    })

    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    await db.dropTable('ResourcePermissions')
    return null
  },
  _meta: { version: 1 }
}
