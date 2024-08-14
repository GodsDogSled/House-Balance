
import { Request, Response, Router } from 'express';
const groupRouter = Router();
// const PaymentGroup = require('../models/paymentGroup')
import groupServices from '../services/groupServices.js';
groupRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const groups = await groupServices.getGroups();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching groups' });
  }
});

export default groupRouter

// groupRouter.post('/createGroup', async (_req: Request, res: Response) => {
//   // const newGroup = new PaymentGroup({
//   //   ..._req.body
//   // })
//   const savedGroup = await newGroup.save();
//   const memberPromises = _req.body.members.map((member: any) => User.findById(member))

//   try {
//     const users = await Promise.all(memberPromises);
//     users.forEach(user => {
//       console.log("user: ", user)
//       user.paymentGroups = user.paymentGroups.concat(savedGroup.id)
//       user.save();
//     })
//   } catch (error) {
//     // Handle any error that occurred in any of the promises
//     console.error('Error fetching users:', error);
//   }

//   res.status(201).json(savedGroup)
// })

// groupRouter.post('/addExpense', async (_req: Request, res: Response) => {
//   const groupExpense = new GroupExpense({
//     ..._req.body
//   })

// })

