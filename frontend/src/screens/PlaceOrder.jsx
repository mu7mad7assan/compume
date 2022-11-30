import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SectionTitle from '../components/SectionTitle';
import StageCard from '../components/StageCard';
import { Store } from '../Context/Store';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod }
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0));
  const shippingPrice = 20;
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:10000/api/orders/placeorder',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
          user: userInfo._id
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`
          }
        },
        { withCredentials: true }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      navigate(`/order/${data.order._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10 bg-gradient-to-r from-main-color to-main-light overflow-hidden">
      <NavBar />
      <SectionTitle title="Preview Order" />
      <StageCard
        title="Shipping Address"
        name={`Name: ${shippingAddress.fullName}`}
        address={`Address: ${shippingAddress.address}`}
        function="Edit"
        onClick={() => navigate('/shippingAddress')}
      />
      <StageCard
        title="Payment Method"
        name={paymentMethod}
        function="Edit"
        onClick={() => navigate('/paymentMethod')}
      />
      <StageCard
        title="Order Summary"
        itemsPrice={`Items: $${itemsPrice}`}
        shippingPrice={`Shipping: $${shippingPrice}`}
        taxPrice={`Tax Price: $${taxPrice}`}
        totalPrice={`Total Price: $${totalPrice}`}
        function="Place Order"
        onClick={placeOrderHandler}
      />
    </div>
  );
};

export default PlaceOrder;
