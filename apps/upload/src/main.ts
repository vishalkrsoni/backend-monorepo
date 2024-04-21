import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  checkNetworkConnection,
  logger,
  mongoConnect,
} from '@backend-monorepo/common';
import multer from 'multer';

import { userRoutes } from './routes';
import {
  createImageTagForClient,
  getImageInfo,
  uploadImage,
  uploadCloud,
} from './controllers/image';
import { multerUpload } from './middlewares/multer';
import { userRouter } from './routes/user';
const { DB_NAME, MONGO_URL, USER_PORT } = process.env;
const app = express();
checkNetworkConnection();
mongoConnect(DB_NAME, MONGO_URL);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// app.post('/upload', upload.single('image'), uploadImage);

app.use(userRouter);

// app.post('/upload/pic', multerUpload.array('image'), async (req, res) => {
  // Set the image to upload
  // const imagePath = req.path
  // Upload the image
  // const publicId = await uploadCloud(imagePath);

  // // Get the colors in the image
  // const colors = await getImageInfo(publicId);

  // // Create an image tag, using two of the colors in a transformation
  // const imageTag = await createImageTagForClient(
  //   publicId,
  //   colors[0][0],
  //   colors[1][0],
  // );

  // Log the image tag to the console
//   console.log(imageTag);

//   // const uploader= await cloudinaryInstance.
//   console.log(req.body);
//   console.log(req.files);
//   res.json({
//     message: 'Successfully uploaded files',
//     body: req.body,
//     file: req.files,
//   });
// });

// Define route for uploading image



// Example usage
// (async () => {
//   try {
//     const awsActions = new AwsActions(s3Client);

//     // Example usage of getReadUrl method
//     const signedUrl = await awsActions.getReadUrl(
//       process.env.AWS_BUCKET_NAME || '',
//       'Picture.JPG',
//     );
//     logger.debug('Generated signed URL:', signedUrl);

//     // Example usage of downloadImage method
//     await awsActions.downloadImage(
//       process.env.AWS_BUCKET_NAME || '',
//       'Picture.JPG',
//       '/path/to/destination',
//     );

//     // Example usage of uploadObject method
//     const imageData = Buffer.from('Your image data here', 'utf-8');
//     await awsActions.uploadObject(
//       process.env.AWS_BUCKET_NAME || '',
//       'NewPicture.JPG',
//       imageData,
//     );

//     // Example usage of deleteObject method
//     await awsActions.deleteObject(
//       process.env.AWS_BUCKET_NAME || '',
//       'Picture.JPG',
//     );

//     // Example usage of listObjects method
//     const objects = await awsActions.listObjects(
//       process.env.AWS_BUCKET_NAME || '',
//     );
//     logger.debug('Objects in bucket:', objects);

//     // Example usage of copyObject method
//     await awsActions.copyObject(
//       process.env.AWS_BUCKET_NAME || '',
//       'SourcePicture.JPG',
//       process.env.AWS_BUCKET_NAME || '',
//       'DestinationPicture.JPG',
//     );

//     // Example usage of checkObjectExists method
//     const objectExists = await awsActions.checkObjectExists(
//       process.env.AWS_BUCKET_NAME || '',
//       'Picture.JPG',
//     );
//     logger.debug('Object exists:', objectExists);

//     // Example usage of getObjectAcl method
//     const objectAcl = await awsActions.getObjectAcl(
//       process.env.AWS_BUCKET_NAME || '',
//       'Picture.JPG',
//     );
//     logger.debug('Object ACL:', objectAcl);

//     // Example usage of putObjectAcl method
//     const aclParams = {
//       // Your ACL parameters here
//     };
//     await awsActions.putObjectAcl(
//       process.env.AWS_BUCKET_NAME || '',
//       'Picture.JPG',
//       aclParams,
//     );
//   } catch (error) {
//     logger.error('Error occurred:', error);
//   }
// })();



app
  .listen(USER_PORT, () =>
    logger.info(`Upload-service started : http://localhost:${USER_PORT}`),
  )
  .on('error', logger.error);
