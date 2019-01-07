import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  IsUUID,
  PrimaryKey,
  AfterCreate
} from 'sequelize-typescript'
import Roles from './roles'
import UserPermissions from './userPermissions'
import Permissions from './permissions'
import uuid from 'uuid/v4'

@Table
class Users extends Model<Users> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: string
  @ForeignKey(() => Roles) public role: string

  @AfterCreate
  public static async createPermissions (instance: Users) {
    const allPermissions = await Permissions.findAll({ attributes: ['id'] })

    const allThisUserPermissions = allPermissions.map((permission: { id: string }) => {
      return { id: uuid(), user: instance.id, permission: permission.id }
    })
    UserPermissions.bulkCreate(allThisUserPermissions)
  }
}

export default Users
