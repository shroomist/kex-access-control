import { initDB } from '../../src/db'
import { Sequelize } from 'sequelize-typescript'

import User from '../../src/db/models/users'
import Role from '../../src/db/models/roles'
import Permission, { PermissionsEnum } from '../../src/db/models/permissions'
import UserPermission from '../../src/db/models/userPermissions'
import Resource from '../../src/db/models/resources'
import ResourcePermission from '../../src/db/models/resourcePermissions'

describe('DB seeders', () => {
  let sqlz: Sequelize
  beforeAll(async () => {
    sqlz = initDB(
      process.env.KEX_DB_URL,
      [Role, User, Permission, UserPermission, ResourcePermission, Resource]
    )
  })

  afterAll(() => {
    sqlz.close()
  })

  describe('Permissions', () => {
    let permissions: Permission[]

    beforeAll(async () => {
      permissions = await Permission.findAll()
    })

    it('has 4 permissions', () => {
      expect(permissions.length).toEqual(4)
    })
  })

  describe('Users', () => {
    let users: User[]

    beforeAll(async () => {
      users = await User.findAll({
        where: {
          name: {
            [Sequelize.Op.or]: ['admin', 'moder']
          }
        },
        include: [Role]
      })
    })

    it('has admin', () => {
      const adminUser = users.find(user => user.name === 'admin')
      expect(adminUser).toBeInstanceOf(User)
      expect(adminUser.role.name).toEqual('admin')
    })

    it('has moder', () => {
      const moderUser = users.find(user => user.name === 'moder')
      expect(moderUser).toBeInstanceOf(User)
      expect(moderUser.role.name).toEqual('moderator')
    })

  })

  describe('Roles', () => {
    let roles: Role[]

    beforeAll(async () => {
      roles = await Role.findAll()
    })

    it('has 3 roles', () => {
      expect(roles.length).toEqual(3)
    })

    it('has admin', async () => {
      const adminRole = roles.find(role => role.name === 'admin')
      expect(adminRole).toBeInstanceOf(Role)
    })

    it('has moderator', async () => {
      const moderatorRole = roles.find(role => role.name === 'moderator')
      expect(moderatorRole).toBeInstanceOf(Role)
    })

    it('has user', async () => {
      const userRole = roles.find(role => role.name === 'user')
      expect(userRole).toBeInstanceOf(Role)
    })
  })

  describe('Resources', () => {
    let resources: Resource[]

    beforeAll(async () => {
      resources = await Resource.findAll({
        include: [{
          model: UserPermission,
          include: [
            { model: Permission },
            { model: User }]
        }]
      })
    })

    it('has moder_resource', () => {
      const moderResource = resources.find(res => res.path === 'moder_resource')
      expect(moderResource.body).toEqual('moder data')
    })

    it('attaches admin read permissions to moder_resource', () => {
      const moderResource: Resource =
        resources.find(res => res.path === 'moder_resource')
      const permissions = moderResource.userPermissions.filter(
        perm => perm.user.name === 'admin'
      )
      expect(permissions).toHaveLength(1)
      expect(permissions[0].permission.name).toEqual(PermissionsEnum.read)
    })

  })
})
