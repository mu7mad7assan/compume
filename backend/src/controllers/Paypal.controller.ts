
import {Request, Response} from 'express';
import Order from '../models/Order.models';

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

// end point https://localhost:8000/api/orders/pay/order/:id
export const CreateOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order) {
      const createdOrder = await createOrder(order.totalPrice.toString());
      res.json(createdOrder);
    } else {
      res.status(404).json({message: 'Order not found'});
    }
  } catch (error) {
    res.status(500).json({message: error});
  }
}

// end point https://localhost:8000/api/orders/pay/order/:id/capture

export const captureOrder = async (req: Request, res: Response) => {
  try {
    const captureData = await capturePayment(req.params.orderId);
    res.json(captureData);
  } catch (error) {
    res.status(500).json({message: error})
  }
}


const createOrder = async (orderTotalPrice: string) => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: orderTotalPrice,
            },
          },
        ],
      }),
    });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
  }
}

const capturePayment = async(orderId: string) => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return handleResponse(response);
  }catch (error) {
    console.log(error);
  }
}

const generateAccessToken = async() => {
  try {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const jsonData = await handleResponse(response);
    return jsonData.access_token;
  } catch (error) {
    console.log(error);
  }
}

const handleResponse = async(response: globalThis.Response) => {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}