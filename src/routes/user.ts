import { adminOnly, checkUserHeader } from '../middleware'
import express from 'express'
import { create } from '../ctrls/user'

const userRouter = express.Router()

userRouter.use('*', checkUserHeader)
userRouter.post('/:name', adminOnly, create)

export { userRouter }
