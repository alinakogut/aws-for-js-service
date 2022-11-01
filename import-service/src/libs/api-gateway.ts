import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
};

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: StatusCodes.OK,
    headers,
    body: JSON.stringify(response),
  };
};

export const formatUnrecognizedErrorResponse = (message: string) => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    headers,
    body: JSON.stringify({
      error: `${getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)}: ${
        message ? message : 'Something went wrong, please try again later'
      }`,
    }),
  };
};
