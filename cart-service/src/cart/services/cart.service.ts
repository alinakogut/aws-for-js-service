import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { v4 } from 'uuid';
import { CartEntity } from '../entities';

import { Cart } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(
    @InjectModel(CartEntity) private readonly cartRepository: typeof CartEntity,
  ) {}

  public findByUserId(id: string): Cart {
    // const cart = await this.cartRepository.findOne({
    //   where: { id },
    // });

    return this.userCarts[id];
  }

  createByUserId(userId: string) {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
  }

  findOrCreateByUserId(userId: string): Cart {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  updateByUserId(userId: string, { items }: Cart): Cart {
    const { id, ...rest } = this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
