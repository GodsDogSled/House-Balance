const User = require('../models/user')
// const PaymentGroup = require('../models/paymentGroup')
import { Request, Response } from 'express';
const userRouter = require('express').Router();


userRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).populate('paymentGroups')

    res.json(users)
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

userRouter.post('/', async (_req: Request, res: Response) => {
  try {
    const body = _req.body
    console.log("body: ", _req.body);
    const newUser = new User({
      ...body
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser);
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = userRouter