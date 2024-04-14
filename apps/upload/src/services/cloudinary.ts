import cloudinaryInstance from '../config/cloudinary';
import fs from 'fs';

export const uploadOnCloudinary = async (
  cloudinaryInstance: any,
  localFilePath: string,
) => {
  try {
    if (!localFilePath) return null;

    //upload on cloudinary
    const uploadResponse = await cloudinaryInstance.uploader.upload(
      localFilePath,
      {
        resource_type: 'auto',
      },
    );

    console.log(`upload response: `, uploadResponse.url);

    return uploadResponse;
  } catch (error) {
    console.log(`error is:`, error);
    // remove the locally saved temp file as upload failed
    fs.unlinkSync(localFilePath);
    return error;
  }
};
