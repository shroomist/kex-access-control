import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript'
import Roles from './roles'

@Table
class Users extends Model<Users> {
  @Column(DataType.STRING) public name: string
  @ForeignKey(() => Roles) public role: string
}
export default Users
