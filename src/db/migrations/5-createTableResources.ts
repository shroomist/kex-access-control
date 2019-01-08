import { QueryInterface, STRING, UUID, fn } from 'sequelize'

const KEY = {
  type: UUID,
  notNull: true
}

const PRIMARY = {
  ...KEY,
  primaryKey: true
}

export default {
  up: async (db: QueryInterface): Promise<any> => {

    await db.createTable('Resource', {
      id: PRIMARY,
      creatorId: {
        ...KEY,
        references: {
          model: 'User'
        }
      },
      path: STRING,
      body: STRING,
    })
    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    await db.dropTable('Resource')
    return null
  },
  _meta: { version: 1 }
}
