import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              fileName: true,
            },
          },
        },
        authorizer: {
          name: 'basicAuthorizer',
          arn: 'arn:aws:lambda:eu-west-1:887284746656:function:authorization-service-dev-basicAuthorizer',
          resultItlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'TOKEN',
        },
      },
    },
  ],
};
