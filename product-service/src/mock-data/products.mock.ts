import { Product } from '@models/product.model';
import { v4 as uuid } from 'uuid';

export const PRODUCTS: Product[] = [
  {
    count: 10,
    description: `In Assassin's Creed Mirage, you are Basim, a cunning street thief with nightmarish visions seeking answers and justice. Assassin's Creed Mirage`,
    id: 'testId',
    price: 2,
    title: `Assassin's Creed Mirage`,
  },
  {
    count: 6,
    description:
      'Welcome to Yara, a tropical paradise frozen in time. As the dictator of Yara, Anton Castillo is intent on restoring his nation back to its former glory by any means, with his son, Diego, following in his bloody footsteps. Their oppressive rule has ignited a revolution.',
    id: uuid(),
    price: 2,
    title: 'Far Cry 6',
  },
  {
    count: 8,
    description:
      'Jump into the Riders Republic massive multiplayer playground! Grab your bike, skis, snowboard, or wingsuit and explore an open world sports paradise where the rules are yours to make—or break.',
    id: uuid(),
    price: 2,
    title: 'Riders Republic',
  },
  {
    count: 6,
    description:
      'Enter the perilous paradise of SKULL AND BONES as you overcome the odds and rise from an outcast to infamous pirate.',
    id: uuid(),
    price: 2,
    title: 'Skull and Bones',
  },
  {
    count: 2,
    description:
      'Rabbids Coding is a game created to be a fun and engaging educational experience.',
    id: uuid(),
    price: 2,
    title: 'Rabbids Coding',
  },
  {
    count: 16,
    description:
      'Save a country on the brink of collapse as you explore an open, dynamic, and hostile world in Washington, DC. Tom Clancy’s The Division 2 is an online action-shooter RPG experience, where exploration and player progression are essential.',
    id: uuid(),
    price: 2,
    title: 'The Division 2',
  },
];

export const getProducts = () =>
  new Promise<Product[]>((resolve) => resolve(PRODUCTS));
