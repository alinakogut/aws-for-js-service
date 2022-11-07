import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

import {
  formatJSONResponse,
  formatUnrecognizedErrorResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { ProductsService } from '@services/products.service';
import { StocksService } from '@services/stocks.service';
import { ProductDto } from '@models/product.model';

const createProduct = async (event: APIGatewayEvent) => {
  console.log(`Create Product handler. Body: ${event.body}`);
  try {
    const id = uuid();
    const productDto = event.body;

    const productsService = new ProductsService();
    const product = await productsService.createProduct(
      id,
      new ProductDto(productDto)
    );

    const stocksService = new StocksService();
    const stock = await stocksService.createStock(id, productDto.count);

    return formatJSONResponse({ product: { ...product, count: stock.count } });
  } catch (err) {
    return formatUnrecognizedErrorResponse(err.message);
  }
};

export const main = middyfy(createProduct);
