import Resource from '../../src/db/models/resources'
import ResourcePermission from '../../src/db/models/resourcePermissions'
import User from '../../src/db/models/users'
import request, { Response } from 'supertest'
import Role from '../../src/db/models/roles'
import UserPermission from '../../src/db/models/userPermissions'
import Permission from '../../src/db/models/permissions'
import express, { Express } from 'express'
import { initDB } from '../../src/db/index'
import { Sequelize } from 'sequelize-typescript'
import { resourceRouter } from '../../src/routes/resource'

describe('/resource', () => {
  let app: Express
  let db: Sequelize

  beforeAll(() => {
    app = express().use(resourceRouter)
    db = initDB(
      process.env.KEX_DB_URL,
      [User, Role, Resource, Permission, UserPermission, ResourcePermission])
  })

  afterAll(async () => {
    await db.close()
  })

  describe('/:new', () => {
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

      describe('existing user in headers', () => {
        let res: Response
        let resource: Resource

        beforeAll(async () => {
          res = await request(app)
            .post(path)
            .send({ text: 'some text' })
            .set('user', 'moder')

          resource = await Resource.findOne({
            where: { path: 'test' },
            include: [{
              model: UserPermission,
              include: [{
                model: User
              }]
            }]
          })
        })

        afterAll(async () => {
          await resource.destroy()
        })

        it('responds with 201-created', () => {
          expect(res.status).toEqual(201)
        })

        it('creates a new resource with body text', async () => {
          expect(resource.body).toEqual('some text')
        })

        it('creates userPermissions for the creator', () => {
          expect(resource.userPermissions).toHaveLength(4)
          expect(resource.userPermissions[0].user.name).toEqual('moder')
        })
      })
    })
  })
})
