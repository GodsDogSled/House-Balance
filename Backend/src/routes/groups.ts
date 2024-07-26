// const User = require('../models/user')
const PaymentGroup = require('../models/paymentGroup')
import { Request, Response } from 'express';
const groupRouter = require('express').Router();

groupRouter.post('/createGroup', async (_req: Request, res: Response) => {
  const newGroup = new PaymentGroup({
    ..._req.body
  })
  const savedGroup = await newGroup.save()
  res.status(201).json(savedGroup)
})

groupRouter.get('/', async (_req: Request, res: Response) => {
  const group = await PaymentGroup.find({}).populate('members')
  res.json(group)
})

module.exports = groupRouter