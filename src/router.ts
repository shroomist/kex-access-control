import { Express } from 'express'
import { resourceRouter } from './resource/resourceRouter'
import { userRouter } from './user/router'

export default (app: Express) => {
  app.use('/resources', resourceRouter)
  app.use('/users', userRouter)
}
