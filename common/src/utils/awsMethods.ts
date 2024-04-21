import { logger } from '@backend-monorepo/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  CopyObjectCommand,
  PutObjectAclCommand,
  HeadObjectCommand,
  GetObjectAclCommand,
} from '@aws-sdk/client-s3';

export class AwsActions {
  private s3Client: S3Client;

  constructor(s3Client: S3Client) {
    this.s3Client = s3Client;
  }

  /**
   * Generates a signed URL to securely read an object from S3.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object to read.
   * @param expiresIn The expiration time of the signed URL in minutes (default: 3600 minutes).
   * @returns A signed URL to securely read the object from the private S3 bucket.
   */
  public async getReadUrl(
    bucketName: string,
    objectName: string,
    expiresIn: number = 3600,
  ) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn,
      });
      return signedUrl;
    } catch (error) {
      logger.error('Error occurred while generating signed read URL:', error);
      throw new Error('Failed to generate signed URL');
    }
  }

  /**
   * Lists objects in an S3 bucket.
   *
   * @param bucketName The name of the S3 bucket.
   * @returns An array of objects in the bucket.
   */
  public async listObjects(bucketName: string) {
    try {
      const command = new ListObjectsCommand({
        Bucket: bucketName,
      });
      const response = await this.s3Client.send(command);
      return response.Contents;
    } catch (error) {
      logger.error('Error listing objects:', error);
      throw new Error('Failed to list objects');
    }
  }

  /**
   * Uploads an object to an S3 bucket.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object to upload.
   * @param imageData The data of the object to upload.
   * @returns The result of the upload operation.
   */
  public async uploadObject(
    bucketName: string,
    objectName: string,
    imageData: Buffer,
  ) {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectName,
        Body: imageData,
      });
      const result = await this.s3Client.send(command);
      return result;
    } catch (error) {
      logger.error('Error uploading object:', error);
      throw new Error('Failed to upload object');
    }
  }

  /**
   * Deletes an object from an S3 bucket.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object to delete.
   * @returns The result of the delete operation.
   */
  public async deleteObject(bucketName: string, objectName: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      const result = await this.s3Client.send(command);
      return result;
    } catch (error) {
      logger.error('Error deleting object:', error);
      throw new Error('Failed to delete object');
    }
  }

  /**
   * Downloads an object from an S3 bucket.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object to download.
   * @param destination The destination to save the downloaded object.
   * @returns void
   */
  public async downloadObject(
    bucketName: string,
    objectName: string,
    destination: string,
  ) {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      const { Body } = await this.s3Client.send(command);
      // Implement logic to save the object to the destination
    } catch (error) {
      logger.error('Error downloading object:', error);
      throw new Error('Failed to download object');
    }
  }

  /**
   * Copies an object within the same S3 bucket.
   *
   * @param sourceBucketName The name of the source S3 bucket.
   * @param sourceObjectName The name of the source object to copy.
   * @param destinationBucketName The name of the destination S3 bucket.
   * @param destinationObjectName The name of the copied object in the destination bucket.
   * @returns The result of the copy operation.
   */
  public async copyObject(
    sourceBucketName: string,
    sourceObjectName: string,
    destinationBucketName: string,
    destinationObjectName: string,
  ) {
    try {
      const command = new CopyObjectCommand({
        Bucket: destinationBucketName,
        CopySource: `/${sourceBucketName}/${sourceObjectName}`,
        Key: destinationObjectName,
      });
      const result = await this.s3Client.send(command);
      return result;
    } catch (error) {
      logger.error('Error copying object:', error);
      throw new Error('Failed to copy object');
    }
  }

  /**
   * Checks if an object exists in an S3 bucket.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object to check.
   * @returns Boolean indicating whether the object exists.
   */
  public async checkObjectExists(bucketName: string, objectName: string) {
    try {
      const command = new HeadObjectCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      await this.s3Client.send(command);
      return true; // Object exists
    } catch (error) {
      if (error.name === 'NotFound') {
        return false; // Object does not exist
      }
      logger.error('Error checking object existence:', error);
      throw new Error('Failed to check object existence');
    }
  }

  /**
   * Gets object access control information.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object.
   * @returns An array of object access control grants.
   */
  public async getObjectAcl(bucketName: string, objectName: string) {
    try {
      const command = new GetObjectAclCommand({
        Bucket: bucketName,
        Key: objectName,
      });
      const response = await this.s3Client.send(command);
      return response.Grants; // Access control information
    } catch (error) {
      logger.error('Error getting object ACL:', error);
      throw new Error('Failed to get object ACL');
    }
  }

  /**
   * Sets object access control information.
   *
   * @param bucketName The name of the S3 bucket.
   * @param objectName The name of the object.
   * @param aclParams The access control parameters.
   * @returns The result of the ACL update operation.
   */
  public async putObjectAcl(
    bucketName: string,
    objectName: string,
    aclParams: any,
  ) {
    try {
      const command = new PutObjectAclCommand({
        Bucket: bucketName,
        Key: objectName,
        AccessControlPolicy: aclParams,
      });
      const response = await this.s3Client.send(command);
      return response; // Confirmation of ACL update
    } catch (error) {
      logger.error('Error setting object ACL:', error);
      throw new Error('Failed to set object ACL');
    }
  }
}
