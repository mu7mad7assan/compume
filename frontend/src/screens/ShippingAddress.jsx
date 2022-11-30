import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SectionTitle from '../components/SectionTitle';
import { Store } from '../Context/Store';

const ShippingAddress = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const { dispatch: ctxDispatch } = useContext(Store);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country
      }
    });
    navigate('/paymentMethod');
  };
  return (
    <div className="h-full bg-gradient-to-r from-main-color to-main-light overflow-hidden p-10">
      <NavBar />
      <SectionTitle title="Shipping Address" />
      <form
        className="container flex flex-col items-center lg:w-2/4 mt-20"
        onSubmit={submitHandler}>
        <input
          placeholder="Enter Full Name"
          className="bg-white appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 border-b-main-color placeholder-main-color mb-4"
          type="text"
          aria-label="text"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          placeholder="Enter Address"
          className="bg-white appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 border-b-main-color placeholder-main-color mb-4"
          type="text"
          aria-label="text"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          placeholder="Enter Your City"
          className="bg-white appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 border-b-main-color placeholder-main-color mb-4"
          type="text"
          aria-label="text"
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          placeholder="Enter PostalCode"
          className="bg-white appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 border-b-main-color placeholder-main-color mb-4"
          type="text"
          aria-label="text"
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <input
          placeholder="Enter your Country"
          className="bg-white appearance-none border-2 border-gray-200 rounded w-2/3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 border-b-main-color placeholder-main-color mb-4"
          type="text"
          aria-label="text"
          onChange={(e) => setCountry(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-button-burble to-button-orange text-white font-bold py-2 px-4 rounded-full w-30"
          type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingAddress;
