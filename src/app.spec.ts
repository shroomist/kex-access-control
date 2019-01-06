import App from './app'
import { getExpress } from './express'
import { getSequel } from './db'
import config from '../sequelize_config.json'
import request from 'supertest'
import { Express } from 'express'

const port = 3001

describe('App', async () => {
  let express: Express
  let app: App

  beforeEach(async () => {
    express = getExpress()
    app = new App(express, getSequel(config.development))
    await app.setup()
    app.listen(port)
  })

  afterEach(() => {
    app.close()
  })

  it('returns 200', async () => {
    const res = await request(express).get('/')
    expect(res.status).toEqual(200)
  })
})
