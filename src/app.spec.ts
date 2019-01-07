import App from './app'
import { getExpress } from './express/express'
import { getSequel } from './db'
import config from '../sequelize_config.json'
import request from 'supertest'
import { Express } from 'express'
import Users from './db/models/users'
import UserPermissions from './db/models/userPermissions'

const port = 3001

describe('App', async () => {
  let express: Express
  let app: App

  beforeAll(async () => {
    express = getExpress()
    app = new App(express, getSequel(config.development))
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
    it('allows admin to create new users', async () => {
      const res = await request(express)
        .post('/users/test')
        .set('user', 'admin')
      expect(res.status).toEqual(201)
      const testUser = await Users.findOne(({ where: { name: 'test' } }))
      expect(testUser.name).toEqual('test')
      const testUserPermissions = await UserPermissions
        .findAll({ where: { user: testUser.id } })
      expect(testUserPermissions).toHaveLength(4)
    })
    afterAll(async () => {
      const user = await Users.findOne({ where: { name: 'test' } })
      await user.destroy()
    })
  })
})
