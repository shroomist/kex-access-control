import { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Server } from 'net'
import { checkUserHeader } from './express/middleware'
import setupRoutes from './router'

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
    await this.authenticateSequelize()
    this.setupAuthorizationMiddleware()
    setupRoutes(this.express)
  }

  public close (cb?: (err: Error) => void) {
    if (this.server) this.server.close(cb)
    this.sequelize.close()
  }

  private async authenticateSequelize () {
    try {
      await this.sequelize.authenticate()
    } catch (err) {
      console.error('authentication to db err', err)
    }
  }

  private setupAuthorizationMiddleware () {
    this.express.use('*', checkUserHeader)
  }
}
