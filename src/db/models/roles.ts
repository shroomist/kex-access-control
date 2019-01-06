import { Table, Column, Model, IsUUID, PrimaryKey, DataType } from 'sequelize-typescript'

const enum RolesEnum {
 admin = 'admin',
 moderator = 'moderator',
 user = 'user'
}

@Table
class Roles extends Model<Roles> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: RolesEnum
}

export default Roles
