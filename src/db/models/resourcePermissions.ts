import { Table, Column, Model, IsUUID, PrimaryKey, ForeignKey, AllowNull } from 'sequelize-typescript'
import Resources from './resources'
import UserPermissions from './userPermissions'

@Table
class ResourcePermissions extends Model<ResourcePermissions> {
  @IsUUID(4) @PrimaryKey @Column public id: string
  @ForeignKey(() => Resources) @AllowNull(false) @Column public resource: string
  @ForeignKey(() => UserPermissions) @AllowNull(false) @Column public userPermission: string
}

export default ResourcePermissions