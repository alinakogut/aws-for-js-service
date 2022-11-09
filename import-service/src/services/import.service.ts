import * as AWS from 'aws-sdk';
import { Readable } from 'stream';

const s3 = new AWS.S3({ region: 'eu-west-1' });
const sqs = new AWS.SQS();
const { BUCKET } = process.env;

export class ImportService {
  public getSignedUrl(fileName: string): Promise<string> {
    return s3.getSignedUrlPromise('getObject', {
      Bucket: BUCKET,
      Key: `uploaded/${fileName}`,
    });
  }

  public getReadStream(key: string): Readable {
    return s3
      .getObject({
        Bucket: BUCKET,
        Key: key,
      })
      .createReadStream();
  }

  public async copyToOtherFolder(key: string): Promise<void> {
    const copyParams = {
      Bucket: BUCKET,
      CopySource: `${BUCKET}/uploaded/${key}`,
      Key: `parsed/${key}`,
    };

    const deleteParams = {
      Bucket: BUCKET,
      Key: `uploaded/${key}`,
    };

    await s3.copyObject(copyParams).promise();
    await s3.deleteObject(deleteParams).promise();
  }

  public async sendSQSMessage(data) {
    await sqs
      .sendMessage({
        QueueUrl: 'catalogItemsQueue',
        MessageBody: data,
      })
      .promise();
  }
}
