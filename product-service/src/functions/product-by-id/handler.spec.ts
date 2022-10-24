import { APIGatewayEvent, Context } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import * as mockProducts from '@mock-data/products.mock';
import { main as getProductsById } from './handler';

describe('Get Product By Id Handler', () => {
  const id = '1';
  const products = [{ ...mockProducts.PRODUCTS[0], id }];
  const mockEvent = { pathParameters: {} } as APIGatewayEvent;
  const getProductsSpy = jest.spyOn(mockProducts, 'getProducts');

  beforeEach(() => {
    mockEvent.pathParameters = { id };
  });

  it('should return product found by id', async () => {
    getProductsSpy.mockResolvedValue(products);
    const response = await getProductsById(mockEvent, {} as Context);
    const { product } = JSON.parse(response.body);

    expect(product).toEqual(products[0]);
  });

  it('should return Bad Request status code if product not found', async () => {
    getProductsSpy.mockResolvedValue([]);
    const response = await getProductsById(mockEvent, {} as Context);

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });
});
