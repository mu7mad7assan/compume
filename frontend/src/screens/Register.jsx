import axios from 'axios';
import React from 'react';
import { GiComputerFan } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import loginPhoto from '../assets/login_photo.svg';

axios.defaults.withCredentials = true;
const Register = () => {
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      userName: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    try {
      await axios.post('http://localhost:10000/api/auth/register', user, {
        withCredentials: true
      });
      navigate('/login');
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
              onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      </div>
      <div className="bg-login-background bg-cover h-screen flex justify-center items-center">
        <div className="xs:h-4/5 xs:w-4/5 sm:h-5/6 sm:w-3/5 rounded-3xl xs:grid xs:grid-rows-1 overflow-hidden">
          <div className="shadow-2xl flex w-full">
            <img src={loginPhoto} className="object-cover w-full" />
          </div>
          <div className="bg-white text-center p-9 flex flex-col items-center">
            <h1 className="mb-4 font-bold text-main-color text-xl sm:text-base">Sign Up</h1>
            <form className="flex flex-col items-center lg:w-3/4" onSubmit={submitHandler}>
              <input
                placeholder="First Name"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="text"
                aria-label="First Name"
                name="firstname"
              />
              <input
                placeholder="Last Name"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="text"
                aria-label="Last Name"
                name="lastname"
              />
              <input
                placeholder="User Name"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="text"
                aria-label="User Name"
                name="username"
              />
              <input
                placeholder="email"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="email"
                aria-label="Email"
                name="email"
              />
              <input
                placeholder="password"
                className="appearance-none bg-transparent w-full text-main-color mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-main-color"
                type="password"
                aria-label="Password"
                name="password"
              />
              <button
                className="bg-main-color hover:bg-main-light text-white font-light py-2 px-4 rounded-full w-40"
                type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
