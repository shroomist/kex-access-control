import express, { Express } from 'express'
import request, { Response } from 'supertest'
import { initDB } from '../../src/db/index'
import Resource from '../../src/db/models/resources'
import ResourcePermission from '../../src/db/models/resourcePermissions'
import UserPermission from '../../src/db/models/userPermissions'
import Role from '../../src/db/models/roles'
import User from '../../src/db/models/users'
import Permission from '../../src/db/models/permissions'
import { Sequelize } from 'sequelize-typescript'
import { userRouter } from '../../src/routes/user'

describe('/user', () => {
  let app: Express
  let db: Sequelize
  beforeAll(() => {
    app = express().use(userRouter)
    db = initDB(
      process.env.KEX_DB_URL,
      [User, Role, Resource, Permission, UserPermission, ResourcePermission])
  })

  afterAll(async () => {
    await db.close()
  })

  describe('/:name', () => {
    const path = '/test'

    describe('POST', () => {
      describe('unauthorized', () => {
        let res: Response

        beforeAll(async () => {
          res = await request(app).post(path)
        })

        it('responds with 401', () => {
          expect(res.status).toEqual(401)
        })
      })

      describe('admin headers', () => {
        let res: Response
        let user: User

        beforeAll(async () => {
          res = await request(app)
            .post(path)
            .set('user', 'admin')

          user = await User.findOne({
            where: { name: 'test' },
            include: [{ model: Role }]
          })
        })

        afterAll(async () => {
          await user.destroy()
        })

        it('responds with 201-created', () => {
          expect(res.status).toEqual(201)
        })

        it('creates a new user', () => {
          expect(user.name).toEqual('test')
        })

        it('adds defaut role "user" to user', () => {
          expect(user.role.name).toEqual('user')
        })

        it('creates userPermissions', async () => {
          const testUserPermissions = await UserPermission
            .findAll({ where: { userId: user.id } })
          expect(testUserPermissions).toHaveLength(4)

        })
      })
    })
  })

})
