const App = require('./src/app')
const getSequelize = require('./src/db')
const getExpress = require('./src/expressSetup')

const port = 3000

const app = new App(getExpress(), getSequelize(), port)

app.setupRoutes() // non-waited promise
app.listen()
