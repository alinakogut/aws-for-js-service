import parse from 'csv-parser';

import { formatUnrecognizedErrorResponse } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ImportService } from '@services/import.service';

const importFileParser = async (event) => {
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  );

  try {
    const importService = new ImportService();
    const stream = importService.getReadStream(key);
    const parserOptions = {
      columns: true,
      auto_parse: true,
      escape: '\\',
      trim: true,
    };

    const parser = parse(parserOptions);
    parser.on('end', (data) => {
      importService.sendSQSMessage(data);
      importService.copyToOtherFolder(key);
    });

    stream.pipe(parser);

    return formatJSONResponse({ ok: 'OK' });
  } catch (err) {
    return formatUnrecognizedErrorResponse(err.message);
  }
};

export const main = middyfy(importFileParser);
