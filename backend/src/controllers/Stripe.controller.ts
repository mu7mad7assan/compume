import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();
const stripe =  new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2022-11-15'
});

export const payment = async (req: Request, res: Response) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: 'USD',
        description: 'happy purchase !',
        payment_method: id,
        confirm: true
    });
    console.log('payment', payment);
    res.json({
      message: 'Payment Successful',
      success: true,
      paymentResult: {
        id: id,
        status: 'Payment Successful',
        update_time: Date.now(),
      }
    })
  } catch (error) {
      console.log(error);
      res.json({
        message: 'Payment Failed',
        success: false
      })
  }
  
}