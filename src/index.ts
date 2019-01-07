import App from './app'
import { getSequel } from './db/index'
import { getExpress } from './express/express'

const PORT = 3000

const app = new App(getExpress(), getSequel(process.env.KEX_DB_URL))

const start = async () => {
  await app.setup()
  app.listen(PORT)
}

start()
