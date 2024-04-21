import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryConfig } from '../config/cloudinary';

export class CloudinaryClient {
  private config: CloudinaryConfig;

  constructor(config: CloudinaryConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize(): void {
    cloudinary.config({
      cloud_name: this.config.cloudName,
      api_key: this.config.apiKey,
      api_secret: this.config.apiSecret,
      secure: this.config.secure,
    });
  }

  public getCloudinaryConfig(): CloudinaryConfig {
    return this.config;
  }
  public async uploadImage(image: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(image);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }
}
