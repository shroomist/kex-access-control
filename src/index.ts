import App from './app'
import { getSequelizeInstance } from './db/index'
import { getExpress } from './express'

const PORT = 3000

const app = new App(getExpress(), getSequelizeInstance())

const start = async () => {
  await app.setup()
  app.listen(PORT)
}

start()
