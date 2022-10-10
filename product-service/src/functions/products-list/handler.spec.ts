import { APIGatewayEvent, Context } from 'aws-lambda';

import * as mockProducts from '@mock-data/products.mock';
import { main as getProductsList } from './handler';

describe('Get Products List', () => {
  const mockEvent = {} as APIGatewayEvent;
  const getProductsSpy = jest.spyOn(mockProducts, 'getProducts');

  beforeEach(() => {
    getProductsSpy.mockResolvedValue([...mockProducts.PRODUCTS]);
  });

  it('should return products', async () => {
    const response = await getProductsList(mockEvent, {} as Context);
    const { products } = JSON.parse(response.body);

    expect(products).toEqual(mockProducts.PRODUCTS);
  });
});
