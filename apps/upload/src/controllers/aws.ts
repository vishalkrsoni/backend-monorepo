import { Request, Response } from 'express';
import { AwsService } from '../services/aws';
import { awsService } from '../store';

export class AwsController {
  private awsService: AwsService;

  constructor() {
    this.awsService = awsService;
  }

  async uploadImage(req: Request, res: Response) {
    const { bucketName, imageName } = req.params;

    try {
      await this.awsService.uploadImage(bucketName, imageName, req.file.buffer);
      res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }

  async getSignedImageUrl(req: Request, res: Response) {
    const { bucketName, imageName } = req.params;

    try {
      const signedUrl = await this.awsService.getSignedImageUrl(bucketName, imageName);
      res.status(200).json({ signedUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch signed URL' });
    }
  }

  async readImages(req: Request, res: Response) {
    const { bucketName } = req.params;

    try {
      const images = await this.awsService.listObjects(bucketName);
      res.status(200).json({ images });
    } catch (error) {
      res.status(500).json({ error: 'Failed to read images from bucket' });
    }
  }

  async deleteImage(req: Request, res: Response) {
    const { bucketName, imageName } = req.params;

    try {
      await this.awsService.deleteImage(bucketName, imageName);
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete image' });
    }
  }
}
