import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  AfterCreate,
  ForeignKey, AllowNull
} from 'sequelize-typescript'

import Users from './users'
import UserPermissions from './userPermissions'
import uuid = require('uuid/v4')
import ResourcePermissions from './resourcePermissions'

@Table
class Resources extends Model<Resources> {

  @AfterCreate
  public static async createPermissions (instance: Resources) {
    const allUserPermissions = await UserPermissions
      .findAll({ where: { user: instance.creator } })
    const resourcePermissions = allUserPermissions
      .map((resourcePermission) => {
        return {
          id: uuid(),
          resource: instance.id,
          permission: resourcePermission.id
        }
      })
    await ResourcePermissions.bulkCreate(resourcePermissions)
  }

  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => Users) @AllowNull(false) @Column public creator: string
  @Column public path: string
  @Column public body: string
}

export default Resources
