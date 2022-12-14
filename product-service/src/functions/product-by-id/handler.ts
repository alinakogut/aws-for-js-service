import { APIGatewayEvent } from 'aws-lambda';

import {
  formatBadRequestResponse,
  formatJSONResponse,
  formatUnrecognizedErrorResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from '@services/products.service';
import { StocksService } from '@services/stocks.service';

const getProductsById = async (event: APIGatewayEvent) => {
  const id = event.pathParameters?.id;

  console.log(`Get Product By Id handler. ID: ${id}`);

  try {
    const productsService = new ProductsService();
    const product = await productsService.getProductById(id);

    const stocksService = new StocksService();
    const stock = await stocksService.getStockByProductId(product.id);

    if (!product) {
      return formatBadRequestResponse('Product not found');
    }

    if (!stock) {
      return formatBadRequestResponse('Stock for requested product not found');
    }

    return formatJSONResponse({ product: { ...product, count: stock.count } });
  } catch (err) {
    return formatUnrecognizedErrorResponse(err.message);
  }
};

export const main = middyfy(getProductsById);
