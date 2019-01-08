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

    await db.createTable('ResourcePermission', {
      id: PRIMARY,
      resourceId: {
        ...KEY,
        references: {
          model: 'Resource'
        },
        onDelete: 'cascade'
      },
      userPermissionId: {
        ...KEY,
        references: {
          model: 'UserPermission'
        }
      }
    })

    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    await db.dropTable('ResourcePermission')
    return null
  },
  _meta: { version: 1 }
}
