import { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Server } from 'net'
import { adminOnly, checkUserHeader } from './express/middleware'
import User from './db/models/users'
import uuid = require('uuid/v4')
import Resource from './db/models/resources'
import { IKexRequest } from './express/express'
import ResourcePermission from './db/models/resourcePermissions'
import UserPermission from './db/models/userPermissions'
import Permission from './db/models/permissions'

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
      const exists = await User.findOne({ where: { name: req.params.name } })
      if (exists) return res.sendStatus(409)
      try {
        await User.create({ id: uuid(), name: req.params.name })
      } catch (err) {
        return res.sendStatus(500)
      }
      res.sendStatus(201)
    })

    this.express.post('/resources/:path', async (req: IKexRequest, res) => {
      const exists = await Resource.findOne({ where: { path: req.params.path } })
      if (exists) return res.sendStatus(409)
      await Resource.create({
        id: uuid(),
        creatorId: req.user.id,
        path: req.params.path,
        body: req.body.text
      })
      res.sendStatus(201)
    })

    this.express.get('/resources/:path', async (req: IKexRequest, res) => {
      const resource = await Resource
        .findOne({
          where: { path: req.params.path },
          include: [{
            model: ResourcePermission,
            include: [{
              model: UserPermission,
              where: { userId: req.user.id },
              include: [{
                model: Permission
              }]
            }]
          }]
        })

      if (!resource) return res.sendStatus(404)
      const readPermission = resource.resourcePermissions.find((rp: ResourcePermission) =>
        rp.userPermission.permission.name === 'read'
      )
      if (!readPermission) return res.sendStatus(401)
      res.send(resource.body)
    })
  }

  private setupAuthorizationMiddleware () {
    this.express.use('*', checkUserHeader)
  }
}
