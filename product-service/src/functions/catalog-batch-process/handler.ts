import { v4 as uuid } from 'uuid';

import {
  formatJSONResponse,
  formatUnrecognizedErrorResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import { ProductsService } from '@services/products.service';
import { ProductDto } from '@models/product.model';

const catalogBatchProcess = async (event) => {
  console.log(`Catalog Batch Process handler`);
  try {
    const productService = new ProductsService();
    const products = await event.Records.map(
      async (record) =>
        await productService.createProduct(uuid(), record.body as ProductDto)
    );

    productService.sendSNSMessageAfterCreate(products);

    return formatJSONResponse({ ok: 'OK' });
  } catch (err) {
    return formatUnrecognizedErrorResponse(err.message);
  }
};

export const main = middyfy(catalogBatchProcess);
