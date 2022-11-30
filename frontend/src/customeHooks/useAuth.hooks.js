import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.withCredentials = true;

export default () => {
  const [Auth, setAuth] = useState();

  const verifyAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/isloggedin', {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await verifyAuth();
      setAuth(data);
    })();
  });
  return { Auth };
};
