import App from './app'
import { getSequel } from './db/index'
import sequelConfig from './db/config.json'
import { getExpress } from './express'

const PORT = 3000

const app = new App(getExpress(), getSequel(sequelConfig.prod))

const start = async () => {
  await app.setup()
  app.listen(PORT)
}

start()
