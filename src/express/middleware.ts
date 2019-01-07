import { Response, NextFunction } from 'express'
import Users from '../db/models/users'
import { IKexRequest } from './express'

export const checkUserHeader = async (req: IKexRequest, res: Response, next: NextFunction) => {
  if (!req.headers.user) return res.sendStatus(401)
  const user = await Users.findOne({ where: { name: req.headers.user } })
  if (!user) return res.sendStatus(401)
  req.user = user
  next()
}

export const adminOnly = async (req: IKexRequest, res: Response, next: NextFunction) => {
  if (req.user.name !== 'admin') return res.sendStatus(401)
  next()
}
