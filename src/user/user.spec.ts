import express, { Express } from 'express'
import request, { Response } from 'supertest'
import { initDB } from '../db'
import Resource from '../db/models/resources'
import ResourcePermission from '../db/models/resourcePermissions'
import UserPermission from '../db/models/userPermissions'
import Role from '../db/models/roles'
import User from '../db/models/users'
import Permission from '../db/models/permissions'
import { userRouter } from './router'

describe('/user', () => {
  let app: Express
  beforeAll(() => {
    app = express().use(userRouter)
    initDB(
      process.env.KEX_DB_URL,
      [User, Role, Resource, Permission, UserPermission, ResourcePermission])
  })

  describe('/:name', () => {
    const path = '/test'

    describe('POST', () => {
      describe('unauthorized', () => {
        let res: Response

        beforeAll(async () => {
          res = await request(app).post(path)
        })

        it('is not allowed', () => {
          expect(res.status).toEqual(401)
        })
      })

      describe('admin', () => {
        let res: Response

        beforeAll(async () => {
          res = await request(app)
            .post(path)
            .set('user', 'admin')
        })

        afterAll(async () => {
          const user = await User.findOne({ where: { name: 'test' } })
          await user.destroy()
        })

        it('responds with 201-created', () => {
          expect(res.status).toEqual(201)
        })

        it('creates a new user', async () => {
          const testUser = await User.findOne(({ where: { name: 'test' } }))
          expect(testUser.name).toEqual('test')
          const testUserPermissions = await UserPermission
            .findAll({ where: { userId: testUser.id } })
          expect(testUserPermissions).toHaveLength(4)
        })
      })
    })
  })

})
