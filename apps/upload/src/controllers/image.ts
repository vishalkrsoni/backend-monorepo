import { Request, Response } from 'express';
import cloudinaryInstance from '../config/cloudinary';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinaryInstance.uploader.upload(req.file.path);

    // After successful upload, you might want to save the Cloudinary URL
    const imageUrl = result.secure_url;
    // Do something with the imageUrl, such as saving it to a database

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const uploadCloud = async (imagePath: string, folder?: string) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinaryInstance.uploader.upload(imagePath, options)

    console.log('Upload result data : ', {
      secureUrl: result.secure_url,
      url: result.url,
      publicId: result.public_id,
      asset_id: result.asset_id,
    });

    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

export const getImageInfo = async (publicId: any) => {
  const options = {
    colors: true,
  };
  try {
    const result = await cloudinaryInstance.api.resource(publicId, options);

    console.log('image info', result);

    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

export const createImageTagForClient = (publicId: any, ...colors: any[]) => {
  const [effectColor, backgroundColor] = colors;
  let imageTag = cloudinaryInstance.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
      { radius: 'max' },
      { effect: 'outline:10', color: effectColor },
      { background: backgroundColor },
    ],
  });
  return imageTag;
};
