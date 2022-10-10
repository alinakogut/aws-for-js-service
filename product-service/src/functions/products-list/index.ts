import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        documentation: {
          summary: 'Get Products List',
          description: 'Gets a list of all products',
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
