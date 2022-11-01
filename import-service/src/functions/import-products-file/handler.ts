import { APIGatewayEvent } from 'aws-lambda';

import { formatUnrecognizedErrorResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ImportService } from '@services/import.service';

const importProductsFile = async (event: APIGatewayEvent) => {
  const fileName = event.queryStringParameters?.fileName;

  try {
    const importService = new ImportService();
    const url = await importService.getSignedUrl(fileName);

    return formatJSONResponse({ url });
  } catch (err) {
    return formatUnrecognizedErrorResponse(err.message);
  }
};

export const main = middyfy(importProductsFile);
