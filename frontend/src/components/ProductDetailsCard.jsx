import React from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';

const ProductDetailsCard = (props) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full rounded-lg overflow-hidden mb-6">
      <div className="h-2/6 overflow-hidden">
        <ImageCarousel productImages={props.productImage} />
      </div>
      <div className=" bg-gradient-to-r from-button-burble to-button-orange h-4/6 text-white xs:p-4 sm:p-14 flex flex-col">
        <div className="mb-10">
          <h1 className="font-bold sm:text-2xl uppercase mb-2">{props.productName}</h1>
          <hr className="mb-2" />
          <h1 className="font-bold sm:text-xl  mb-2">Price : {props.productPrice}</h1>
          <h1 className="font-bold sm:text-xl">
            {' '}
            Style :{' '}
            <span className="font-light text-justify sm:text-xl mb-2">{props.productSlug}</span>
          </h1>
          <h1 className="font-bold sm:text-xl text-justify mb-2">
            description :{' '}
            <span className="font-light text-justify">{props.productDescription}</span>
          </h1>
          <h1 className="font-bold sm:text-xl text-justify mb-2">
            brand : <span className="font-light text-justify">{props.productBrand}</span>
          </h1>
          <h1 className="font-bold sm:text-xl text-justify mb-2">
            Color : <span className="font-light text-justify">{props.productColor}</span>
          </h1>
          <h1 className="font-bold sm:text-xl text-justify mb-2">
            ConnectivityTechnology :{' '}
            <span className="font-light text-justify">{props.productConnectivity}</span>
          </h1>
        </div>
        <div className="flex justify-around items-center">
          <button
            className="bg-gradient-to-r from-main-color to-main-light text-white py-2 px-4 rounded-full w-30 font-bold xs:text-xs"
            onClick={() => navigate('/shop')}>
            Go Shopping
          </button>
          <button
            className="bg-gradient-to-r from-main-color to-main-light text-white py-2 px-4 rounded-full w-30 font-bold xs:text-xs"
            onClick={props.addToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
