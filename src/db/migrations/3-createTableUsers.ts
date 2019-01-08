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

    await db.createTable('User', {
      id: PRIMARY,
      name: STRING,
      roleId: {
        type: UUID,
        references: {
          model: 'Role',
          key: 'id'
        }
      }
    })
    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    return db.dropTable('User')
  },
  _meta: { version: 1 }
}
