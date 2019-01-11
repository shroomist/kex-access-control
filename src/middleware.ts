import { NextFunction, Request, Response } from 'express'
import User from './db/models/users'
import Role, { RolesEnum } from './db/models/roles'

interface IKexRequest extends Request {
  user?: User
}

const checkUserHeader =
  async (req: IKexRequest, res: Response, next: NextFunction) => {

    if (!req.headers.user) return res.sendStatus(401)

    const user = await User.findOne({
      where: { name: req.headers.user },
      include: [Role]
    })

    if (!user) return res.sendStatus(401)

    req.user = user
    next()
  }

// TODO: to be deprecated
const adminOnly = async (req: IKexRequest, res: Response, next: NextFunction) => {
  if (req.user.role.name !== RolesEnum.admin) return res.sendStatus(401)
  next()
}

export { IKexRequest, checkUserHeader, adminOnly }
