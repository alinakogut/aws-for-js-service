import * as AWS from 'aws-sdk';

import { Stock } from '@models/stock.model';

const dynamo = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const { TABLE_NAME_STOCKS } = process.env;

export class StocksService {
  public async getStocks(): Promise<Stock[]> {
    const scanResults = await dynamo
      .scan({ TableName: TABLE_NAME_STOCKS })
      .promise();
    return scanResults.Items as Stock[];
  }

  public async getStockByProductId(productId: string): Promise<Stock> {
    const stock = await dynamo
      .query({
        TableName: TABLE_NAME_STOCKS,
        KeyConditionExpression: `product_id = :product_id`,
        ExpressionAttributeValues: { [`:product_id`]: productId },
      })
      .promise();

    return stock.Items[0] as Stock;
  }

  public async createStock(
    productId: string,
    count: number | undefined
  ): Promise<Stock> {
    await dynamo
      .put({
        TableName: TABLE_NAME_STOCKS,
        Item: { product_id: productId, count: count || 0 },
      })
      .promise();

    return this.getStockByProductId(productId);
  }
}
