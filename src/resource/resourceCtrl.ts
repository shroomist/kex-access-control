import { IKexRequest } from '../express/express'
import Resource from '../db/models/resources'
import uuid = require('uuid/v4')
import { Response } from 'express'
import ResourcePermission from '../db/models/resourcePermissions'
import UserPermission from '../db/models/userPermissions'
import Permission from '../db/models/permissions'

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
        model: ResourcePermission,
        include: [{
          model: UserPermission,
          where: { userId: req.user.id },
          include: [{
            model: Permission
          }]
        }]
      }]
    })

  if (!resource) return res.sendStatus(404)
  const readPermission = resource.resourcePermissions.find((rp: ResourcePermission) =>
    rp.userPermission.permission.name === 'read'
  )
  if (!readPermission) return res.sendStatus(401)
  res.send(resource.body)
}

export { create, read }
