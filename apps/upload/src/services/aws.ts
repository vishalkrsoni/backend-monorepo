import { S3Client } from '@aws-sdk/client-s3';
import { AwsActions } from 'common/src/utils';

export class AwsService {
  private awsActions: AwsActions;

  constructor(private s3Client: S3Client) {
    this.awsActions = new AwsActions(this.s3Client);
  }

  async uploadImage(bucketName: string, imageName: string, imageData: Buffer) {
    return await this.awsActions.uploadObject(bucketName, imageName, imageData);
  }

  async getSignedImageUrl(bucketName: string, imageName: string) {
    return await this.awsActions.getReadUrl(bucketName, imageName);
  }

  async listObjects(bucketName: string) {
    return await this.awsActions.listObjects(bucketName);
  }

  async deleteImage(bucketName: string, imageName: string) {
    return await this.awsActions.deleteObject(bucketName, imageName);
  }
}
