// const mongoose = require('mongoose');
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  paymentGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentGroup'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)


export default User
