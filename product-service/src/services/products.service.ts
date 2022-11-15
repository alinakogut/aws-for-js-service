import * as AWS from 'aws-sdk';

import { Product, ProductDto } from '@models/product.model';
import { Stock } from '@models/stock.model';

const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const sns = new AWS.SNS({ region: 'eu-west-1' });

const { TABLE_NAME_PRODUCTS } = process.env;

export class ProductsService {
  public async getProducts(): Promise<Product[]> {
    const scanResults = await dynamo
      .scan({ TableName: TABLE_NAME_PRODUCTS })
      .promise();
    return scanResults.Items as Product[];
  }

  public async getProductById(id: string): Promise<Product> {
    const queryResults = await dynamo
      .query({
        TableName: TABLE_NAME_PRODUCTS,
        KeyConditionExpression: `id = :id`,
        ExpressionAttributeValues: { [`:id`]: id },
      })
      .promise();

    return queryResults.Items[0] as Product;
  }

  public async createProduct(id: string, dto: ProductDto): Promise<Product> {
    await dynamo
      .put({
        TableName: TABLE_NAME_PRODUCTS,
        Item: { ...dto, id },
      })
      .promise();

    return this.getProductById(id);
  }

  public joinProductsAndStocks = (
    products: Product[],
    stocks: Stock[]
  ): Product[] => {
    const productIdToStockMap = stocks.reduce(
      (acc: Map<string, Stock>, stock: Stock) =>
        acc.set(stock.product_id, stock),
      new Map()
    );

    return products.reduce(
      (acc, product) => [
        ...acc,
        {
          ...product,
          count: productIdToStockMap.get(product.id)?.count || 0,
        },
      ],
      [] as Product[]
    );
  };

  public sendSNSMessageAfterCreate(products: Product[]): void {
    sns.publish({
      Subject: 'Product was successfully created',
      Message: JSON.stringify(products),
      TopicArn: 'createdProductTopic',
    });
  }
}
