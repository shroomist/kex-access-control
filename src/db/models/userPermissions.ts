import {
  Table,
  Column,
  Model,
  IsUUID,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  BelongsTo,
  HasMany
} from 'sequelize-typescript'
import User from './users'
import Permission from './permissions'
import ResourcePermission from './resourcePermissions'

@Table
class UserPermission extends Model<UserPermission> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => User) @AllowNull(false) @Column public userId: string
  @ForeignKey(() => Permission) @AllowNull(false) @Column public permissionId: string
  @BelongsTo(() => Permission) public permission: Permission
}

export default UserPermission
