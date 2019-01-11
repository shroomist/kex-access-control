import express from 'express'

import { initDB } from './db/index'
import router from './routes'

import Role from './db/models/roles'
import User from './db/models/users'
import Permission from './db/models/permissions'
import UserPermission from './db/models/userPermissions'
import ResourcePermission from './db/models/resourcePermissions'
import Resource from './db/models/resources'

const PORT = 3000

const db = initDB(process.env.KEX_DB_URL, [
  Role,
  User,
  Permission,
  UserPermission,
  ResourcePermission,
  Resource
])

const expressApp = express()
router(expressApp)
const server = expressApp.listen(PORT)

process.on('SIGTERM', () => {
  let exitCode = 0
  server.close(() => {
    db.close()
      .catch(() => {
        exitCode = 1
      })
      .finally(() => {
        process.exit(exitCode)
      })
  })

})
