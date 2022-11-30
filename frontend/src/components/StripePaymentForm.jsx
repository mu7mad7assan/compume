import React, { useContext, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Store } from '../Context/Store';
import dotenv from 'dotenv';

dotenv.config();

axios.defaults.withCredentials = true;
const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: 'white',
      color: 'white',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: 'white' },
      '::placeholder': { color: 'white' }
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee'
    }
  }
};

const StripePaymentForm = (props) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  console.log(Math.ceil(props.orderTotalPrice));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          `http://localhost:${process.env.PORT}/api/orders/payment`,
          {
            amount: Math.ceil(props.orderTotalPrice),
            id
          },
          { withCredentials: true }
        );
        if (response.data.success) {
          console.log('Successful Payment');
          setSuccess(true);
          await axios.put(
            `http://localhost:${process.env.PORT}/api/orders/order/${props.orderId}/pay`,
            response.data.paymentResult,
            {
              headers: {
                authorization: `Bearer ${userInfo.token}`
              }
            },
            { withCredentials: true }
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="w-ful flex flex-col justify-center">
          <fieldset>
            <div>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button
            className="bg-main-color hover:bg-main-light text-white font-bold py-2 px-4 rounded-full w-40 mt-8"
            type="submit">
            Pay
          </button>
        </form>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert">
          <span className="block sm:inline">Payment Success</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      )}
    </>
  );
};

export default StripePaymentForm;
