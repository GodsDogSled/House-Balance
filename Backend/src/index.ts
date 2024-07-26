// import mongoose from 'mongoose'
import mongoose from 'mongoose'
import express from 'express';
const User = require('./models/user')
const config = require('../utils/config')

const middleware = require('../utils/middleware')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

const app = express();
app.use(express.json());

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error: unknown) => {
    logger.error('error connecting to MongoDB:', error)
  })

app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.post('/setup/test', async (_req, res) => {
  const body = _req.body
  console.log("body: ", _req.body);
  const newUser = new User({
    ...body
  })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser);
});

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});