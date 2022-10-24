export const ProductSchema = {
  type: 'object',
  properties: {
    count: { type: 'number' },
    description: { type: 'string' },
    id: { type: 'string' },
    price: { type: 'string' },
    title: { type: 'string' },
  },
  required: ['count', 'description', 'id', 'price', 'title'],
};
