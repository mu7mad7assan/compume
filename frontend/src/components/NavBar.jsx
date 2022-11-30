import React, { useContext, useState } from 'react';
import { GiComputerFan } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { BsCart4 } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Context/Store.jsx';
import { Transition } from '@headlessui/react';

axios.defaults.withCredentials = true;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems }
  } = state;
  const navigate = useNavigate();
  const signOutHandler = async () => {
    try {
      await axios.get('http://localhost:10000/api/auth/logout', {
        withCredentials: true
      });
      ctxDispatch({ type: 'USER_SIGNOUT' });
      localStorage.removeItem('userInfo');
      localStorage.removeItem('cart');
      localStorage.removeItem('ShippingAddress');
      localStorage.removeItem('paymentMethod');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <nav className="bg-transparent">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="w-full flex justify-between items-center">
                <div className="text-white font-bold">
                  <Link to="/" className="flex flex-row items-center">
                    <GiComputerFan size={30} className="text-white mr-3" />
                    <h1 className="text-xl">Compu-Me</h1>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <div className="ml-10 flex justify-around items-center">
                    <a href="#" className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                      {cartItems ? (
                        <button
                          type="button"
                          className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
                          onClick={() => navigate('/shippingAddress')}>
                          <BsCart4 size={30} className="text-white mr-3" />
                          <span className="sr-only">Notifications</span>
                          <div className="inline-flex absolute top-1 right-4 justify-center items-center w-6 h-6 text-xs font-bold bg-gradient-to-r from-button-burble to-button-orange rounded-full">
                            {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                          </div>
                        </button>
                      ) : (
                        <Link to="/shippingAddress" className="flex flex-row items-center">
                          <BsCart4 size={30} className="mr-3" />
                        </Link>
                      )}
                    </a>

                    <a
                      href={`/profile/${userInfo._id}`}
                      className="text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center">
                      <CgProfile size={30} className="mr-3" />
                      {userInfo.userName}
                    </a>
                    <button
                      className="bg-gradient-to-r from-button-burble to-button-orange text-white py-2 px-4 rounded-full w-30 font-bold text-xs"
                      onClick={signOutHandler}>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gradient-to-r from-button-burble to-button-orange inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <Transition
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            {(ref) => (
              <div className="container md:hidden" id="mobile-menu">
                <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <a className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                    {cartItems ? (
                      <button
                        type="button"
                        className="inline-flex relative items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
                        onClick={() => navigate('/shippingAddress')}>
                        <BsCart4 size={30} className="text-white mr-3" />
                        <span className="sr-only">Notifications</span>
                        <div className="inline-flex absolute top-1 right-4 justify-center items-center w-6 h-6 text-xs font-bold bg-gradient-to-r from-button-burble to-button-orange rounded-full">
                          {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                        </div>
                      </button>
                    ) : (
                      <Link to="/shippingAddress" className="flex flex-row items-center">
                        <BsCart4 size={30} className="mr-3" />
                      </Link>
                    )}
                  </a>

                  <a
                    href="#"
                    className="text-white px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center">
                    <CgProfile size={30} className="mr-3" />
                    {userInfo.userName}
                  </a>
                  <button
                    className="bg-gradient-to-r from-button-burble to-button-orange text-white py-2 px-4 rounded-full w-30 font-bold text-xs"
                    onClick={signOutHandler}>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
