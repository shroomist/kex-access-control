import { Table, Column, Model, IsUUID, PrimaryKey, DataType } from 'sequelize-typescript'

const enum RolesEnum {
  admin = 'admin',
  moderator = 'moderator',
  user = 'user'
}

@Table
class Role extends Model<Role> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: RolesEnum
}

export default Role
export { RolesEnum }
