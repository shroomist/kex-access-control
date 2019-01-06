import { Table, Column, Model, DataType, IsUUID, PrimaryKey } from 'sequelize-typescript'

const enum PermissionsEnum {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete'
}

@Table
class Permissions extends Model<Permissions> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @Column(DataType.STRING) public name: PermissionsEnum
}

export default Permissions
