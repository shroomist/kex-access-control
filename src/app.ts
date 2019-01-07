import { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Server } from 'net'
import { adminOnly, checkUserHeader } from './express/middleware'
import Users from './db/models/users'
import uuid = require('uuid/v4')

export default class App {
  private server: Server

  constructor (private readonly express: Express,
               private readonly sequelize: Sequelize) {
  }

  public listen (port: number) {
    this.server = this.express.listen(port, () =>
      console.log(`listening on port ${port}`))
  }

  public async setup () {
    await this.setupSequelize()
    this.setupAuthorizationMiddleware()
    this.setupRoutes()
  }

  public close (cb?: (err: Error) => void) {
    if (this.server) this.server.close(cb)
    this.sequelize.close()
  }

  private async setupSequelize () {
    try {
      await this.sequelize.authenticate()
    } catch (err) {
      console.log('connection to db err', err)
    }
  }

  private setupRoutes () {
    this.express.get('/', (req, res) => res.send('Hello World!'))
    this.express.post('/users/:name', adminOnly, async (req, res) => {
      const found = await Users.findOne({ where: { name: req.params.name } })
      console.log(found)
      if (found) return res.sendStatus(409)
      try {
        await Users.create({ id: uuid(), name: req.params.name })
      } catch (err) {
        console.log(err)
        return res.sendStatus(500)
      }
      res.sendStatus(201)
    })
  }

  private setupAuthorizationMiddleware () {
    this.express.use('*', checkUserHeader)
  }
}
