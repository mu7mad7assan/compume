import React from 'react';
import { GiComputerFan } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import home from '../assets/home.svg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gradient-to-r from-main-color to-main-light h-screen overflow-hidden">
        <div className="sticky bg-transparent border-solid border-b-2 border-b-slate-100">
          <div className="container flex flex-row justify-between items-center p-3 ">
            <div className="text-white font-bold">
              <Link to="/" className="flex flex-row items-center">
                <GiComputerFan size={30} className="text-white mr-3" />
                <h1 className="text-xl">Compu-Me</h1>
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 h-screen">
          <div className="flex flex-col p-12">
            <h1 className="font-bold text-6xl text-white mb-4 mt-16">Online Shop</h1>
            <p className="w-70 text-justify text-white mb-8">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.{' '}
            </p>
            <div className="flex flex-row justify-between items-center">
              <button
                className="bg-gradient-to-r from-button-burble to-button-orange text-white font-bold py-2 px-4 rounded-full w-40"
                onClick={() => navigate('/shop')}>
                Get Started
              </button>
            </div>
          </div>
          <div className="xs:hidden md:block">
            <img src={home} className="object-cover h-screen" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
