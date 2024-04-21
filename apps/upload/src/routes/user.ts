import express from 'express';
import { awsController, userController } from '../store';
import multer, { memoryStorage } from 'multer';

const upload = multer({ storage: memoryStorage() });

export const userRouter = express.Router();

// Route for uploading an image
userRouter.post(
  '/user/:bucketName/:imageName',
  upload.single('image'),
  awsController.uploadImage,
);

// Route for fetching all users
userRouter.get('/user', userController.getAll.bind(userController));

// Route for fetching a user by ID
userRouter.get('/user/:id', userController.getById.bind(userController));

// Route for updating a user by ID
userRouter.put('/user/:id', userController.updateById.bind(userController));

// Route for deleting a user by ID
userRouter.delete('/user/:id', userController.deleteById.bind(userController));

// Route for deleting an image from S3
userRouter.delete(
  '/user/image/:bucketName/:imageName',
  awsController.deleteImage.bind(awsController),
);

// Route for reading images from S3 bucket
userRouter.get(
  '/user/images/:bucketName',
  awsController.readImages.bind(awsController),
);

