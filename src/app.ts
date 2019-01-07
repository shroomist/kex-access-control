import { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { Server } from 'net'
import { checkUserHeader } from './express/middleware'

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
  }

  private setupAuthorizationMiddleware () {
    this.express.use('*' , checkUserHeader)
  }
}
