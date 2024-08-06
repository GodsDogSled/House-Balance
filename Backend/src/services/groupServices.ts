import { Group } from "../types";
import PaymentGroup from "../models/paymentGroup";
// import User from "../models/user";


const getGroups = async () => {

  const groups: Group[] = await PaymentGroup.find({}).populate([
    { path: 'members', select: 'name' },
    { path: 'createdBy', select: 'name' }
  ]);

  return groups

}

// const getUsers = async (): Promise<UserType[]> => {
//   const users: UserType[] = await User.find({}).populate('paymentGroups')
//   return users
// }

export default {
  getGroups
}