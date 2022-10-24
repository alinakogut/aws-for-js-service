import { handlerPath } from '@libs/handler-resolver';
import { ProductSchema } from '@schemas/schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        request: {
          schemas: {
            'application/json': ProductSchema
          }
        },
        documentation: {
          summary: 'Create product',
          description: 'Create new product',
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Created product',
              },
              responseModels: {},
            },
          ],
        },
      },
    },
  ],
};
