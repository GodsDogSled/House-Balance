// const config = require('./utils/config')
// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// const middleware = require('./utils/middleware')
// const logger = require('./utils/logger')

// //routers
// const userRouter = require('')

// mongoose.set('strictQuery', false)
// logger.info('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB')
//   })
//   .catch((error: unknown) => {
//     logger.error('error connecting to MongoDB:', error.message)
//   })

// app.use(express.static('dist'))
// app.use(express.json())
// app.use(middleware.requestLogger)


// app.use('/api/users', userRouter)
// app.use('/api/paymentGroup', groupRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

// module.exports = app
