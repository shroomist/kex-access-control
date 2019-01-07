import App from './app'
import { getExpress } from './express/express'
import { getSequel } from './db'
import request, { Response } from 'supertest'
import { Express } from 'express'
import Users from './db/models/users'
import UserPermissions from './db/models/userPermissions'
import Resources from './db/models/resources'
import ResourcePermissions from './db/models/resourcePermissions'

const port = 3001

describe('App', async () => {
  let express: Express
  let app: App

  beforeAll(async () => {
    express = getExpress()
    app = new App(express, getSequel(process.env.KEX_DB_URL))
    await app.setup()
    app.listen(port)
  })

  afterAll(() => {
    app.close()
  })

  describe('middlewares', () => {
    it('returns 401, if no user header exists', async () => {
      const res = await request(express).get('/')
      expect(res.status).toEqual(401)
    })
    it('returns 200, if user exists in headers and db', async () => {
      const res = await request(express).get('/').set('user', 'admin')
      expect(res.status).toEqual(200)
    })
  })

  describe('/users/:name', () => {
    const path = '/users/test'

    describe('POST', () => {
      describe('unauthorized', () => {
        let res: Response

        beforeAll(async () => {
          res = await await request(express).post(path)
        })

        it('is not allowed', () => {
          expect(res.status).toEqual(401)
        })
      })

      describe('admin', () => {
        let res: Response

        beforeAll(async () => {
          res = await request(express)
            .post('/users/test')
            .set('user', 'admin')
        })

        afterAll(async () => {
          const user = await Users.findOne({ where: { name: 'test' } })
          await user.destroy()
        })

        it('responds with 201-created', () => {
          expect(res.status).toEqual(201)
        })

        it('creates a new user', async () => {
          const testUser = await Users.findOne(({ where: { name: 'test' } }))
          expect(testUser.name).toEqual('test')
          const testUserPermissions = await UserPermissions
            .findAll({ where: { user: testUser.id } })
          expect(testUserPermissions).toHaveLength(4)
        })
      })
    })
  })

  describe('/resources/:new', () => {
    const path = '/resources/test'
    describe('POST', () => {
      describe('any user', () => {
        let res: Response

        beforeAll(async () => {
          res = await request(express)
            .post(path)
            .send({ text: 'some text' })
            .set('user', 'admin')
        })

        afterAll(async () => {
          const resource = await Resources.findOne({ where: { path: 'test' } })
          await resource.destroy()
        })

        it('responds with 201-created', () => {
          expect(res.status).toEqual(201)
        })

        it('creates a new resource in db, and permissions for the user', async () => {
          const resource = await Resources.findOne({ where: { path: 'test' } })
          expect(resource.body).toEqual('some text')

          const resourcePermissions = await ResourcePermissions
            .findAll({ where: { resource: resource.id } })
          expect(resourcePermissions).toHaveLength(4)
        })

        // it('creates permissions on that resource for this user', async() => {
        // })
      })
    })
  })
})
