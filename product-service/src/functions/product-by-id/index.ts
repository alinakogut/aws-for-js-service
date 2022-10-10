import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
        documentation: {
          summary: 'Get Product By Id',
          description: 'Gets a product by id',
          pathParams: {
            name: 'id',
            description: 'The username for a user to create',
            schema: { type: 'string' },
          },
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'A list of products',
              },
              responseModels: {},
            },
          ],
        },
      },
    },
  ],
};
