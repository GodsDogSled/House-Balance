import mongoose from "mongoose"

const groupExpense = new mongoose.Schema({
  paymentName: String,
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentGroup'
  },
  usersInvolved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  paymentDivisionType: String,
  ammountPaid: Number,
})

groupExpense.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const GroupExpense = mongoose.model('PaymentGroup', groupExpense)

export default GroupExpense