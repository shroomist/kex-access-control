import { QueryInterface, UUID, fn } from 'sequelize'

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

    await db.createTable('UserPermission', {
      id: PRIMARY,
      userId: {
        ...KEY,
        references: {
          model: 'User'
        },
        onDelete: 'cascade'
      },
      permissionId: {
        ...KEY,
        references: {
          model: 'Permission'
        },
        onDelete: 'cascade'
      }
    })

    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    await db.dropTable('UserPermission')
    return null
  },
  _meta: { version: 1 }
}
