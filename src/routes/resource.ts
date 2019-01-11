import express from 'express'
import { checkUserHeader } from '../middleware'
import bodyParser from 'body-parser'
import { create, read, destroy } from '../ctrls/resource'

const resourceRouter = express.Router()

resourceRouter.use('*', checkUserHeader)
resourceRouter.use(bodyParser.json())
resourceRouter.post('/:path', create)
resourceRouter.get('/:path', read)
resourceRouter.delete('/:path', destroy)

export { resourceRouter }
