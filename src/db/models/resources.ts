import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  AfterCreate,
  ForeignKey, AllowNull, HasMany, BelongsToMany
} from 'sequelize-typescript'

import User from './users'
import UserPermission from './userPermissions'
import uuid = require('uuid/v4')
import ResourcePermission from './resourcePermissions'

@Table
class Resource extends Model<Resource> {

  @AfterCreate
  public static async createPermissions (instance: Resource) {
    const allUserPermissions = await UserPermission
      .findAll({ where: { userId: instance.creatorId } })
    const resourcePermissions = allUserPermissions
      .map((userPermission: UserPermission) => {
        return {
          id: uuid(),
          resourceId: instance.id,
          userPermissionId: userPermission.id
        }
      })
    await ResourcePermission.bulkCreate(resourcePermissions)
  }

  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => User) @AllowNull(false) @Column public creatorId: string
  @Column public path: string
  @Column public body: string
  @BelongsToMany(() => UserPermission, { through: () => ResourcePermission })
  public userPermissions: UserPermission[]
}

export default Resource
