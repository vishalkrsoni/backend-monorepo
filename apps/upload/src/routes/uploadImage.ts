import { Router } from 'express';
import { multerUpload } from '../middlewares/multer';
import cloudinaryInstance from '../config/cloudinary';
import { uploadCloud } from '../controllers/image';

export const uploadRouter = Router();

uploadRouter.use(
  'upload/pic',
  multerUpload.array('image'),
  async (req, res) => {


    const uploadRes = async (path) => await uploadCloud(path, 'images');

    
    // const uploader= await cloudinaryInstance.
    console.log(req.body);
    console.log(req.files);
    res.json({
      message: 'Successfully uploaded files',
      body: req.body,
      file: req.files,
    });
  },
);
