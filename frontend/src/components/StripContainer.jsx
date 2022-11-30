import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './StripePaymentForm';
const PUPLIC_KEY =
  'pk_test_51M8R6YAp15Xj0y97xf2wga8tkXC8ZPQgWygizcmiYXk2HARtCf9foAs1SIrRWhuqDIKSzPMTgesQM0mwZxslozFJ001StJ8yjy';
const stripeTestPromise = loadStripe(PUPLIC_KEY);

const StripContainer = (props) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <StripePaymentForm orderTotalPrice={props.orderTotalPrice} orderId={props.orderId} />
    </Elements>
  );
};

export default StripContainer;
