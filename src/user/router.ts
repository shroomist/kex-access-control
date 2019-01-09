import { adminOnly } from '../express/middleware'
import express from 'express'
import { create } from './userCtrl'

const userRouter = express.Router()

userRouter.post('/:name', adminOnly, create)

export { userRouter }