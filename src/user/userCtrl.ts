import User from '../db/models/users'
import { IKexRequest } from '../getExpress'
import { Response } from 'express'
import uuid = require('uuid/v4')

const create = async (req: IKexRequest, res: Response) => {
  const exists = await User.findOne({ where: { name: req.params.name } })
  if (exists) return res.sendStatus(409)
  try {
    await User.create({ id: uuid(), name: req.params.name })
  } catch (err) {
    return res.sendStatus(500)
  }
  res.sendStatus(201)
}

export { create }
