import type { AWS } from '@serverless/typescript';

import { DBTables } from '@configs/db.config';

import getProductsList from '@functions/products-list';
import getProductsById from '@functions/product-by-id';
import createProduct from '@functions/create-product';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-openapi-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TABLE_NAME_PRODUCTS: DBTables.Products,
      TABLE_NAME_STOCKS: DBTables.Stocks,
      QUEUE_NAME: 'catalogItemsQueue',
      SNS_TOPIC_NAME: 'createProductTopic',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource:
              'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.TABLE_NAME_PRODUCTS}',
          },
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem',
            ],
            Resource:
              'arn:aws:dynamodb:${aws:region}:*:table/${self:provider.environment.TABLE_NAME_STOCKS}',
          },
          {
            Effect: 'Allow',
            Action: ['sqs:*'],
            Resource: [
              {
                'Fn::GetAtt': ['SQSQueue', 'Arn'],
              },
            ],
          },
          {
            Effect: 'Allow',
            Action: ['sqs:*'],
            Resource: [
              {
                Ref: 'SNSTopic',
              },
            ],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:provider.environment.QUEUE_NAME}',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: '${self:provider.environment.SNS_TOPIC_NAME}',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'a.l.i.n.a22k.ogut@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    documentation: {
      version: '1',
      title: 'AWS jor JS API',
      description: 'AWS jor JS practitioner Service API',
      models: {},
    },
  },
};

module.exports = serverlessConfiguration;
