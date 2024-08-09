import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config'
import config from '../utils/config.js';

import userRouter from './routes/users.js';
import groupRouter from './routes/groups.js';
import googleRouter from './routes/google.js';

import middleware from "../utils/middleware.js";
import logger from "../utils/logger.js";

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
const MONGODB_URI = process.env.MONGODB_URI as string
const app = express();
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error: unknown) => {
    logger.error('error connecting to MongoDB:', error)
  })

app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use('/users', userRouter)
app.use('/groups', groupRouter)
app.use('/api/sessions/oauth/google', googleRouter)



const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});