import {
  formatJSONResponse,
  formatUnrecognizedErrorResponse,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from '@services/products.service';
import { StocksService } from '@services/stocks.service';

const getProductsList = async () => {
  console.log(`Get Products List handler`);

  try {
    const productsService = new ProductsService();
    const products = await productsService.getProducts();

    const stocksService = new StocksService();
    const stocks = await stocksService.getStocks();

    const productsWithStocks = productsService.joinProductsAndStocks(
      products,
      stocks
    );

    return formatJSONResponse({ products: productsWithStocks });
  } catch (err) {
    return formatUnrecognizedErrorResponse(err.message);
  }
};

export const main = middyfy(getProductsList);
