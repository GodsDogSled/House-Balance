import { GroupType, UserType } from "../types.js";
import PaymentGroup from "../models/paymentGroup.js";
import UserModel from "../models/user.js";


const getGroups = async (): Promise<GroupType[]> => {
  const groups: GroupType[] = await PaymentGroup.find({}).populate([
    { path: 'members', select: 'name' },
    { path: 'createdBy', select: 'name' }
  ]);
  return groups
}

const getUsers = async (): Promise<UserType[]> => {
  const users: UserType[] = await UserModel.find({}).populate('paymentGroups').populate({
    path: 'paymentGroups',
    populate: [
      {
        path: 'createdBy',
        select: 'name email'
      },
      {
        path: 'members',
        select: 'name email'
      }
    ]
  }

  )
  return users
}

export default {
  getGroups,
  getUsers
}

