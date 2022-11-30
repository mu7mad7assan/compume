import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginPhoto from '../assets/login_photo.svg';
import { GiComputerFan } from 'react-icons/gi';
import axios from 'axios';
import { Store } from '../Context/Store';

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userLogin = {
        email,
        password
      };
      const res = await axios.post('http://localhost:10000/api/auth/login', userLogin, {
        withCredentials: true
      });
      const {
        data: {
          data: {
            _doc: { email: mail, firstName, lastName, isAdmin, userName, _id },
            token
          }
        }
      } = res;
      ctxDispatch({
        type: 'USER_SIGNIN',
        payload: {
          mail,
          firstName,
          lastName,
          userName,
          isAdmin,
          _id,
          token
        }
      });
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          mail: userInfo.mail,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          userName: userInfo.userName,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
          token: userInfo.token
        })
      );
      navigate('/shop');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky bg-main-light border-solid border-b-2 border-b-slate-100">
        <div className="container flex flex-row justify-between items-center p-3 ">
          <div className="text-white font-bold">
            <Link to="/" className="flex flex-row items-center">
              <GiComputerFan size={30} className="text-white mr-3" />
              <h1 className="text-xl">Compu-Me</h1>
            </Link>
          </div>
          <div className="flex flex-row justify-between items-center">
            <button
              className="bg-white hover:bg-main-light text-main-color font-bold py-2 px-4 rounded-full w-30"
              onClick={() => navigate('/register')}>
              register
            </button>
          </div>
        </div>
      </div>
      <div className="bg-login-background bg-cover h-screen flex justify-center items-center">
        <div className="xs:h-4/5 xs:w-4/5 sm:h-4/5 sm:w-3/5 rounded-3xl grid grid-rows-2 overflow-hidden">
          <div className="shadow-2xl flex w-full">
            <img src={loginPhoto} className="object-cover w-full" />
          </div>
          <div className="bg-white text-center p-9 flex flex-col items-center">
            <h1 className="mb-4 font-bold text-main-color text-xl sm:text-base">
              Login Your account
            </h1>
            <form className="flex flex-col items-center lg:w-2/4" onSubmit={submitHandler}>
              <input
                placeholder="email"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="email"
                aria-label="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="password"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="password"
                aria-label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-main-color hover:bg-main-light text-white font-light py-2 px-4 rounded-full w-30"
                type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
