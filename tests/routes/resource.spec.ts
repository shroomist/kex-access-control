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
      describe('any user', () => {
        let res: Response

        beforeAll(async () => {
          res = await request(app)
            .post(path)
            .send({ text: 'some text' })
            .set('user', 'admin')
        })

        afterAll(async () => {
          const resource = await Resource.findOne({ where: { path: 'test' } })
          await resource.destroy()
        })

        it('responds with 201-created', () => {
          expect(res.status).toEqual(201)
        })

        it('creates a new resource in db, and permissions for the user', async () => {
          const resource = await Resource.findOne({ where: { path: 'test' } })
          expect(resource.body).toEqual('some text')

          const resourcePermissions = await ResourcePermission
            .findAll({ where: { resourceId: resource.id } })
          expect(resourcePermissions).toHaveLength(4)
        })
      })
    })
  })
})
