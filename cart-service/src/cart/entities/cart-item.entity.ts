import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { CartEntity } from './cart.entity';

interface CartItemCreationAttrs {
  cart_id: string;
  product_id: string;
  count: number;
}

@Table({ tableName: 'cart_items' })
export class CartItemEntity extends Model<
  CartItemEntity,
  CartItemCreationAttrs
> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  product_id: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  count: number;

  @BelongsTo(() => CartEntity)
  cart_id: string;
}
