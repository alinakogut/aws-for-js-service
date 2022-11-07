import * as AWS from 'aws-sdk';

import { DBTables } from '@configs/db.config';
import { Product } from '@models/product.model';

import { getMockProducts } from '@mock-data/products.mock';

const ddb = new AWS.DynamoDB({ region: 'eu-west-1' });

const generateParamsForProduct = (item: Product) => ({
  TableName: DBTables.Products,
  Item: {
    id: { S: item.id },
    title: { S: item.title },
    description: { S: item.description },
    price: { N: `${item.price}` },
  },
});

const generateParamsForStocks = (item: Product) => ({
  TableName: DBTables.Stocks,
  Item: {
    product_id: { S: item.id },
    count: { N: `${item.count}` },
  },
});

const post = (params) => {
  ddb.putItem(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
    }
  });
};

const fillTables = async () => {
  const products = await getMockProducts();
  products.forEach((product) => {
    post(generateParamsForProduct(product));
    post(generateParamsForStocks(product));
  });
};

fillTables();
