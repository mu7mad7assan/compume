import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
import NavBar from '../components/NavBar';
import SectionTitle from '../components/SectionTitle';
import { Store } from '../Context/Store';

axios.defaults.withCredentials = true;

const Profile = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: userId } = params;
  const [email, setEmail] = useState(userInfo.mail);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(userInfo.userName);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:10000/api/users/${userId}`,
        {
          email: email,
          userName: userName,
          password: password
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`
          }
        },
        { withCredentials: true }
      );
      ctxDispatch({ type: 'USER_SIGNOUT' });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="sticky bg-main-light border-solid border-b-2 border-b-slate-100">
        <NavBar />
        <SectionTitle title="Profile" description="You Can change your Info" />
        <div className="container p-8 bg-gradient-to-r from-button-burble to-button-orange rounded-2xl mt-8 mb-9 flex justify-center">
          <form className="flex flex-col items-center lg:w-2/4" onSubmit={submitHandler}>
            <input
              placeholder={userInfo.userName}
              className="appearance-none bg-transparent w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-white"
              type="text"
              aria-label="text"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              placeholder={userInfo.mail}
              className="appearance-none bg-transparent w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-white"
              type="email"
              aria-label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="change Your password"
              className="appearance-none bg-transparent w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none mb-4 border-b-2 border-b-main-color placeholder-white"
              type="password"
              aria-label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-main-color hover:bg-main-light text-white font-light py-2 px-4 rounded-full w-30"
              type="submit">
              Update
            </button>
          </form>
        </div>
        <SectionTitle title="Cart" description="Your Cart" />
        <div className="container mt-8 mb-8">
          <CartItemCard />
        </div>
      </div>
    </>
  );
};

export default Profile;
