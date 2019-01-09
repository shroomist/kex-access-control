import { adminOnly, checkUserHeader } from '../middleware'
import express from 'express'
import { create } from './userCtrl'

const userRouter = express.Router()

userRouter.use('*', checkUserHeader)
userRouter.post('/:name', adminOnly, create)

export { userRouter }
