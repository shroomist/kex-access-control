import { IKexRequest } from '../middleware'
import Resource from '../db/models/resources'
import uuid = require('uuid/v4')
import { Response } from 'express'
import UserPermission from '../db/models/userPermissions'
import Permission, { PermissionsEnum } from '../db/models/permissions'

const create = async (req: IKexRequest, res: Response) => {
  const exists = await Resource.findOne({ where: { path: req.params.path } })
  if (exists) return res.sendStatus(409)
  await Resource.create({
    id: uuid(),
    creatorId: req.user.id,
    path: req.params.path,
    body: req.body.text
  })
  res.sendStatus(201)
}

const read = async (req: IKexRequest, res: Response) => {
  const resource = await Resource
    .findOne({
      where: { path: req.params.path },
      include: [{
        model: UserPermission,
        where: { userId: req.user.id },
        include: [{
          model: Permission
        }]
      }]
    })

  if (!resource) return res.sendStatus(404)
  const readPermission = resource.userPermissions.find(userPerm =>
    userPerm.permission.name === PermissionsEnum.read
  )
  if (!readPermission) return res.sendStatus(401)
  res.send(resource.body)
}

const destroy = async (req: IKexRequest, res: Response) => {
  const resource = await Resource
    .findOne({
      where: { path: req.params.path },
      include: [{
        model: UserPermission,
        include: [{
          model: Permission
        }],
        where: { userId: req.user.id }
      }]
    })
  const delPerm = resource.userPermissions.find(userPerm =>
    userPerm.permission.name === PermissionsEnum.delete
  )
  if (!delPerm) return res.sendStatus(401)

  await resource.destroy()
  res.sendStatus(200)
}

export { create, read, destroy }
