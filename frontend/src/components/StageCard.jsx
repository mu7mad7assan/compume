import React, { useContext } from 'react';
import { Store } from '../Context/Store';
import Paypal from './Paypal';
import StripContainer from './StripContainer';

const StageCard = (props) => {
  const { state } = useContext(Store);
  const {
    cart: { paymentMethod }
  } = state;
  console.log(paymentMethod);
  return (
    <div className="bg-transparent container mt-14 rounded overflow-hidden border-2 border-solid border-fuchsia-400">
      <div className="w-full bg-gradient-to-r from-button-burble to-button-orange h-14 p-2">
        <h1 className="text-white text-2xl">{props.title}</h1>
      </div>
      <div className="w-full bg-transparent p-4 pr-10 pl-10 xs:text-sm sm:text-xl">
        <h3 className="text-white mb-2">
          <span className="">{props.name}</span>
        </h3>
        <h3 className="text-white">
          <span>{props.address}</span>
        </h3>
        <h3 className="text-white">
          <span>{props.itemsPrice}</span>
        </h3>
        <h3 className="text-white">
          <span>{props.shippingPrice}</span>
        </h3>
        <h3 className="text-white">
          <span>{props.taxPrice}</span>
        </h3>
        <h3 className="text-white">
          <span>{props.totalPrice}</span>
        </h3>
        <div className="container mt-10 flex justify-center items-center">
          {props.checkout ? (
            paymentMethod === 'PayPal' ? (
              <div className="bg-gradient-to-r from-button-burble to-button-orange w-full flex justify-center items-center rounded-2xl p-8">
                <Paypal orderId={props.orderId} />
              </div>
            ) : (
              <div className="bg-gradient-to-r from-button-burble to-button-orange w-full rounded-2xl p-8">
                <StripContainer orderTotalPrice={props.orderTotalPrice} orderId={props.orderId} />
              </div>
            )
          ) : props.function ? (
            <button
              className="bg-gradient-to-r from-button-burble to-button-orange text-white font-bold py-2 px-4 rounded-full w-30 text-sm"
              onClick={props.onClick}>
              {props.function}
            </button>
          ) : (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert">
              <span className="block sm:inline">{props.orderState}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StageCard;
