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
const { DB_NAME, MONGO_URL, USER_PORT } = process.env;
const app = express();
checkNetworkConnection();
mongoConnect(DB_NAME, MONGO_URL);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('image'), uploadImage);

app.use(userRoutes);

app.post('/upload/pic', multerUpload.array('image'), async (req, res) => {
  // Set the image to upload
  const imagePath = req.path
  // Upload the image
  const publicId = await uploadCloud(imagePath);

  // Get the colors in the image
  const colors = await getImageInfo(publicId);

  // Create an image tag, using two of the colors in a transformation
  const imageTag = await createImageTagForClient(
    publicId,
    colors[0][0],
    colors[1][0],
  );

  // Log the image tag to the console
  console.log(imageTag);

  // const uploader= await cloudinaryInstance.
  console.log(req.body);
  console.log(req.files);
  res.json({
    message: 'Successfully uploaded files',
    body: req.body,
    file: req.files,
  });
});

// Define route for uploading image

app
  .listen(USER_PORT, () =>
    logger.info(`Upload-service started : http://localhost:${USER_PORT}`),
  )
  .on('error', logger.error);
