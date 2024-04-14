import { v2 as cloudinaryInstance } from 'cloudinary';
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const cloudinaryConfig = {
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
};

cloudinaryInstance.config(cloudinaryConfig);

console.log('config is: ', cloudinaryInstance.config());

export default cloudinaryInstance;
