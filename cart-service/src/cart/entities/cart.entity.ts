import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { CartItemEntity } from './cart-item.entity';

interface CartCreationAttrs {
  id: string;
  created_at: Date;
  updated_at: Date;
}

@Table({ tableName: 'carts' })
export class CartEntity extends Model<CartEntity, CartCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.DATE, unique: false, allowNull: false })
  created_at: Date;

  @Column({ type: DataType.DATE, unique: false, allowNull: false })
  updated_at: Date;

  @HasMany(() => CartItemEntity)
  items: any[];
}
