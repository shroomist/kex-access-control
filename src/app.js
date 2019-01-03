module.exports = class App {
  constructor(expressApp, sequelize, expressPort) {
    this.app = expressApp
    this.sequelize = sequelize
    this.expressPort = expressPort
  }

  async setupRoutes() {
    try {
      await this.sequelize.authenticate()
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
    console.log('Connection has been established successfully.')


    this.app.get('/', (req, res) => res.send('Hello World!'))
  }

  listen() {
    this.app.listen(this.expressPort, () =>
      console.log(`Example app listening on port ${this.expressPort}!`))
  }
}
