import { Express } from 'express'
import { resourceRouter } from './resource'
import { userRouter } from './user'

export default (app: Express) => {
  app.use('/resources', resourceRouter)
  app.use('/users', userRouter)
}
