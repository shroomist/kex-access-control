import express from 'express'
import { create, read } from './resourceCtrl'

const resourceRouter = express.Router()

resourceRouter.post('/:path', create)
resourceRouter.get('/:path', read)

export { resourceRouter }