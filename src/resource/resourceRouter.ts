import express from 'express'
import { create, read, destroy } from './resourceCtrl'
import { checkUserHeader } from '../middleware'
import bodyParser from 'body-parser'

const resourceRouter = express.Router()

resourceRouter.use('*', checkUserHeader)
resourceRouter.use(bodyParser.json())
resourceRouter.post('/:path', create)
resourceRouter.get('/:path', read)
resourceRouter.delete('/:path', destroy)

export { resourceRouter }
