import { QueryInterface } from 'sequelize'
import Resource from '../models/resources'
import { initDB } from '../index'
import User from '../models/users'
import uuid = require('uuid/v4')
import ResourcePermission from '../models/resourcePermissions'
import UserPermission from '../models/userPermissions'
import Permission from '../models/permissions'

export default {
  up: async () => {
    const sqlz = initDB(process.env.KEX_DB_URL, [
      Resource,
      ResourcePermission,
      UserPermission,
      User
    ])
    const moder = await User.findOne({ where: { name: 'moder' } })
    const admin = await User.findOne({
      where: { name: 'admin' },
      include: [{
        model: UserPermission,
        include: [{
          model: Permission,
          where: { name: 'read' }
        }]
      }]
    })

    const adminReadPermission = admin.userPermissions.find(
      (perm: UserPermission) => perm.permission.name === 'read'
    )

    const newResource = await Resource.create({
      id: uuid(),
      path: 'moder_resource',
      body: 'moder data',
      creatorId: moder.id
    })

    await ResourcePermission.create({
      id: uuid(),
      resourceId: newResource.id,
      userPermissionId: adminReadPermission.id
    })

    return sqlz.close()

  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('Resource', null, {})
    // TODO: fix identifier to not dump all Resources
  }
}
