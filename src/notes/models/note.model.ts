import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Note extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  category: string;

  @Column(DataType.STRING)
  content: string;

  @Column({ defaultValue: false })
  archived: boolean;
}
