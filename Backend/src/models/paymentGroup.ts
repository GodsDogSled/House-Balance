import mongoose from "mongoose"

const paymentGroupSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  groupName: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  memberDebts: [
    {
      members: [],
      currentBalance: Number
    }
  ],
  paymentHistory: [
    {
      date: String,
      ammountPaid: Number,
      usersInvolved: []
    }
  ]
})

paymentGroupSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    // delete returnedObject.passwordHash
  }
})

const PaymentGroup = mongoose.model('PaymentGroup', paymentGroupSchema)

module.exports = PaymentGroup