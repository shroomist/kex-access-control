import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  BelongsTo
} from 'sequelize-typescript'
import Resource from './resources'
import UserPermission from './userPermissions'

@Table
class ResourcePermission extends Model<ResourcePermission> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => Resource) @AllowNull(false) @Column public resourceId: string
  @ForeignKey(() => UserPermission) @AllowNull(false) @Column public userPermissionId: string
  @BelongsTo(() => UserPermission) public userPermission: UserPermission
}

export default ResourcePermission
