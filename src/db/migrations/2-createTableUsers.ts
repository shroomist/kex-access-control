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

    await db.createTable('Users', {
      id: PRIMARY,
      name: STRING,
      role: {
        type: UUID,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'restrict',
        onDelete: 'cascade'
      }
    })
    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    return db.dropTable('Users')
  },
  _meta: { version: 1 }
}
