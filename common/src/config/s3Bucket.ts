import { S3Client } from '@aws-sdk/client-s3';

const s3ConfigParams = {
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export const s3Client = new S3Client(s3ConfigParams);
