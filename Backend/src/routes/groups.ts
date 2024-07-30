const groupRouter = require('express').Router();
const User = require('../models/user')
const PaymentGroup = require('../models/paymentGroup')
import { Request, Response } from 'express';
const groupServices = require('../services/groupCalculations');


groupRouter.post('/createGroup', async (_req: Request, res: Response) => {
  const newGroup = new PaymentGroup({
    ..._req.body
  })
  const savedGroup = await newGroup.save();
  const memberPromises = _req.body.members.map((member: any) => User.findById(member))

  try {
    const users = await Promise.all(memberPromises);
    users.forEach(user => {
      console.log("user: ", user)
      user.paymentGroups = user.paymentGroups.concat(savedGroup.id)
      user.save();
    })
  } catch (error) {
    // Handle any error that occurred in any of the promises
    console.error('Error fetching users:', error);
  }

  res.status(201).json(savedGroup)
})

groupRouter.get('/', async (_req: Request, res: Response) => {
  const group = await PaymentGroup.find({}).populate([
    { path: 'members' },
    {
      path: 'createdBy',
      select: 'name'
    }])
  res.json(group)
})

groupRouter.post('/addExpense', async (_req: Request, res: Response) => {
  res.status(201).json(groupServices.splitByTwo(16));
})

module.exports = groupRouter