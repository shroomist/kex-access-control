import { QueryInterface, STRING, UUID, UUIDV4 } from 'sequelize'

const KEY = {
  type: UUID,
  notNull: true
}

const PRIMARY = {
  ...KEY,
  primaryKey: true,
  defaultValue: UUIDV4
}

export default {
  up: async (db: QueryInterface): Promise<any> => {
    await db.createTable('Roles', {
      id: PRIMARY,
      name: STRING
    })

    return null
  },
  down: async (db: QueryInterface): Promise<any> => {
    db.dropTable('Roles')
    return null
  },
  _meta: { version: 1 }
}
