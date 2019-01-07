import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  IsUUID,
  PrimaryKey
} from 'sequelize-typescript'
import Roles from './roles'

@Table
class Users extends Model<Users> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: string
  @ForeignKey(() => Roles) public role: string
}

export default Users
