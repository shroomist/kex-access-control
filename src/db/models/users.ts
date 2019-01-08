import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  IsUUID,
  PrimaryKey,
  AfterCreate, BelongsTo
} from 'sequelize-typescript'
import Role from './roles'
import UserPermission from './userPermissions'
import Permission from './permissions'
import uuid from 'uuid/v4'

@Table
class User extends Model<User> {

  @AfterCreate
  public static async createPermissions (instance: User) {
    const allPermissions = await Permission.findAll({ attributes: ['id'] })

    const allThisUserPermissions = allPermissions.map((permission: Permission) => {
      return { id: uuid(), userId: instance.id, permissionId: permission.id }
    })
    UserPermission.bulkCreate(allThisUserPermissions)
  }
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: string
  @ForeignKey(() => Role) public roleId: string
  @BelongsTo(() => Role) public role: Role
}

export default User
