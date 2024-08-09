import User from '../models/user.js';
import groupServices from '../services/groupServices.js';
// const PaymentGroup = require('../models/paymentGroup')
import { Request, Response } from 'express';
import express from 'express';
const userRouter = express.Router();


userRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await groupServices.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
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



export default userRouter