import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  IsUUID,
  PrimaryKey,
  AfterCreate,
  BelongsTo,
  BeforeCreate,
  BelongsToMany,
  HasMany
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

  @BeforeCreate
  public static async addDefaultPermission (instance: User) {
    if (instance.roleId) return
    const userRole = await Role.findOne({
      where: { name: 'user' }
    })
    instance.roleId = userRole.id
  }

  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: string
  @ForeignKey(() => Role) public roleId: string
  @BelongsTo(() => Role) public role: Role
  @BelongsToMany(() => Permission, { through: () => UserPermission })
  public permissions: Permission[]
  @HasMany(() => UserPermission) public userPermissions: UserPermission[]
}

export default User
