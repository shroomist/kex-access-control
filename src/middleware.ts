import { Response, NextFunction } from 'express'
import User from './db/models/users'
import { IKexRequest } from './getExpress'
import Role from './db/models/roles'

export const checkUserHeader = async (req: IKexRequest, res: Response, next: NextFunction) => {
  if (!req.headers.user) return res.sendStatus(401)
  const user = await User.findOne({ where: { name: req.headers.user }, include: [Role] })
  if (!user) return res.sendStatus(401)
  req.user = user
  next()
}

export const adminOnly = async (req: IKexRequest, res: Response, next: NextFunction) => {
  if (req.user.role.name !== 'admin') return res.sendStatus(401)
  next()
}
