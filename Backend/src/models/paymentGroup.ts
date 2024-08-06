import mongoose from "mongoose"

const paymentGroupSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  groupName: { type: String, required: true },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  memberDebts: [
    {
      members: [],
      currentBalance: { type: Number, required: true }
    }
  ],
  paymentHistory: [
    {
      date: { type: String, required: true },
      ammountPaid: { type: Number, required: true },
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

export default PaymentGroup