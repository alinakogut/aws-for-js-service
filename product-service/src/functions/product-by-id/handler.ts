import { APIGatewayEvent } from 'aws-lambda';

import {
  formatBadRequestResponse,
  formatJSONResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProducts } from '@mock-data/products.mock';

const getProductsById = async (event: APIGatewayEvent) => {
  const id = event.pathParameters?.id;
  const products = await getProducts();
  const product = products.find((product) => product.id === id);

  if (!product) {
    return formatBadRequestResponse('Product not found');
  }

  return formatJSONResponse({ product });
};

export const main = middyfy(getProductsById);
