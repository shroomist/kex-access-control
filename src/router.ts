import { IKexRequest } from './express/express'
import { Express, Response } from 'express'
import { resourceRouter } from './resource/router'
import { userRouter } from './user/router'

export default (app: Express) => {
  app.get('/', (req: IKexRequest, res: Response) => res.send('Hello World!'))
  app.use('/resources', resourceRouter)
  app.use('/users', userRouter)
}
