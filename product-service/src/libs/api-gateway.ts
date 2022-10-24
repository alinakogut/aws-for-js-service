import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { FromSchema } from 'json-schema-to-ts';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': 'https://d1t533ukpfai4z.cloudfront.net',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
};

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: StatusCodes.OK,
    headers,
    body: JSON.stringify(response),
  };
};

export const formatBadRequestResponse = (message: string) => {
  return {
    statusCode: StatusCodes.BAD_REQUEST,
    headers,
    body: JSON.stringify({
      error: `${getReasonPhrase(StatusCodes.BAD_REQUEST)}: ${message}`,
    }),
  };
};
