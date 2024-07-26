// const mongoose = require('mongoose');
import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 3
//   },
//   name: String,
//   passwordHash: String,
//   paymentGroups: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'paymentGroup'
//     }
//   ],
// })
const userSchema = new mongoose.Schema({
  name: String,
  paymentGroups: [],
})

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//     // the passwordHash should not be revealed
//     delete returnedObject.passwordHash
//   }
// })

const User = mongoose.model('User', userSchema)

module.exports = User