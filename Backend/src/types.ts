import { Types } from 'mongoose';
export enum PaymentDivision {
  SplitByTwo = 'splitByTwo',
  EvenSplit = 'evenSplit',
  PercentageSplit = 'percentageSplit'
}

export interface GroupExpense {
  name: string,
  paidBy: Types.ObjectId,
  group: Types.ObjectId,
  usersInvolved: Array<Types.ObjectId>,
  paymentDivisionType: PaymentDivision,
  ammoutPaid: number
}



interface User {
  _id: Types.ObjectId;
  name: string;
}

export interface MemberDebts {
  members: Types.ObjectId[],
  currentBalance: number
}

export interface PaymentHistory {
  date: string,
  ammountPaid: number,
  usersInvolved: Types.ObjectId[]
}

interface BaseGroup {
  _id: Types.ObjectId,
  createdBy: Types.ObjectId,
  groupName: String,
  members: Types.ObjectId[]
}

interface GroupNoPayments extends BaseGroup {
  memberDebts: null | undefined,
  paymentHistory: null | undefined
}

interface GroupWithPayments extends BaseGroup {
  memberDebts: MemberDebts[],
  paymentHistory: PaymentHistory[]
}

export type Group = GroupNoPayments | GroupWithPayments

export interface UserType {
  name: String,
  paymentGroups?: Array<Types.ObjectId>
}