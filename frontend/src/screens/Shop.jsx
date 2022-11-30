import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { FiPercent } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv';

dotenv.config();
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Products = () => {
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: []
  });
  const fetchProducts = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      await axios.get(`http://localhost:${process.env.PORT}/api/products/seed`, {
        withCredentials: true
      });
      const response = await axios.get('/api/products/show', {
        withCredentials: true
      });
      const products = await response.data;
      dispatch({ type: 'FETCH_SUCCESS', payload: products });
    } catch (error) {
      dispatch({ type: 'FETCH_FAIL', payload: error });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="bg-gradient-to-r from-main-color to-main-light overflow-hidden">
      <NavBar />
      <div className="container bg-gradient-to-r from-button-burble to-button-orange xs:h-40 md:h-80 rounded-2xl mt-4 p-10">
        <div className="container flex justify-between items-center">
          <div className="text-white font-bold text-start uppercase flex flex-col justify-around mt-2">
            <h1 className="font-bold xs:text-2xl md:text-4xl">Compu me</h1>
            <h1 className="xs:text-6xl md:text-8xl font-extrabold">Big Sale</h1>
          </div>
          <div className="text-white font-bold xs:hidden md:block">
            <div className="flex justify-around items-center">
              <span className="text-8xl">50</span>
              <FiPercent size={90} className="text-white mr-3" />
            </div>
            <div>
              <span className="text-8xl uppercase">off</span>
            </div>
          </div>
        </div>
      </div>
      <SectionTitle title="Best Seller Products" description="gurantee perfectionism" />
      <div className="container mt-10 xs:grid xs:grid-cols-1 sm:grid sm:grid-cols-2 gap-8">
        {loading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product, idx) => (
            <ProductCard
              productImage={product.image[0]}
              key={idx}
              productName={product.name}
              productPrice={`${product.price} $`}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
