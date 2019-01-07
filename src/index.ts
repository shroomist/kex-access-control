import App from './app'
import { getSequel } from './db/index'
import sequelConfig from '../sequelize_config.json'
import { getExpress } from './express/express'

const PORT = 3000

const app = new App(getExpress(), getSequel(sequelConfig.development))

const start = async () => {
  await app.setup()
  app.listen(PORT)
}

start()
