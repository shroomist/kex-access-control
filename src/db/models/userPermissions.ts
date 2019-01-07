import { Table, Column, Model, IsUUID, PrimaryKey, ForeignKey, AllowNull } from 'sequelize-typescript'
import Users from './users'
import Permissions from './permissions'

@Table
class UserPermissions extends Model<UserPermissions> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => Users) @AllowNull(false) @Column public user: string
  @ForeignKey(() => Permissions) @AllowNull(false) @Column public permission: string
}

export default UserPermissions
