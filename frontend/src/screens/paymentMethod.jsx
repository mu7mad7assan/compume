import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SectionTitle from '../components/SectionTitle';
import { Store } from '../Context/Store';

const paymentMethod = () => {
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);
  return (
    <div className="h-screen bg-gradient-to-r from-main-color to-main-light overflow-hidden text-white">
      <NavBar />
      <SectionTitle title="Payment Method" />
      <div className="container mt-10 p-10">
        <label htmlFor="paymentmethod" className="block mb-2 text-sm font-medium text-white">
          Select a paymentMethod
        </label>
        <select
          id="paymentmethod"
          className="bg-gradient-to-r from-button-burble to-button-orange text-white text-sm rounded-lg block w-full p-2.5"
          onChange={(e) => ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: e.target.value })}>
          <option defaultValue className="text-black">
            Choose a Payment Method
          </option>
          <option value="PayPal" className="text-black">
            PayPal
          </option>
          <option value="Strip" className="text-black">
            Strip
          </option>
        </select>
      </div>
      <div className="container mt-10 flex justify-center items-center">
        <button
          className="bg-gradient-to-r from-button-burble to-button-orange text-white font-bold py-2 px-4 rounded-full w-40"
          onClick={() => navigate('/placeOrder')}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default paymentMethod;
