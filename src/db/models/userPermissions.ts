import { Table, Column, Model, IsUUID, PrimaryKey, ForeignKey } from 'sequelize-typescript'
import Users from './users'
import Permissions from './permissions'

@Table
class UserPermissions extends Model<UserPermissions> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => Users) @Column public user: string
  @ForeignKey(() => Permissions) @Column public permission: string
}

export default UserPermissions
