import {
  Table,
  Column,
  Model,
  DataType,
  IsUUID,
  PrimaryKey,
  BelongsToMany
} from 'sequelize-typescript'
import User from './users'
import UserPermission from './userPermissions'

const enum PermissionsEnum {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete'
}

@Table
class Permission extends Model<Permission> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: PermissionsEnum
  @BelongsToMany(() => User, { through: () => UserPermission })
  public users: User[]
}

export default Permission
export { PermissionsEnum }
