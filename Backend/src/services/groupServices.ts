import { GroupType, UserType } from "../types";
import PaymentGroup from "../models/paymentGroup";
import User from "../models/user";


const getGroups = async (): Promise<GroupType[]> => {
  const groups: GroupType[] = await PaymentGroup.find({}).populate([
    { path: 'members', select: 'name' },
    { path: 'createdBy', select: 'name' }
  ]);
  return groups
}

const getUsers = async (): Promise<UserType[]> => {
  const users: UserType[] = await User.find({}).populate('paymentGroups').populate({
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