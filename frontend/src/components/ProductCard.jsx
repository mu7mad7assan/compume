import React from 'react';
import { GoTriangleRight } from 'react-icons/go';

const ProductCard = (props) => {
  return (
    <div className="bg-white w-full h-80 rounded-lg overflow-hidden mb-6">
      <div className="h-4/5 overflow-hidden flex justify-center items-center p-4">
        <img src={props.productImage} className="max-h-full" />
      </div>
      <div className="bg-gradient-to-r from-button-burble to-button-orange w-full  flex justify-between items-center h-1/5 text-white font-bold px-6">
        <div className="flex flex-col uppercase text-xs">
          <h1>{props.productName}</h1>
          <h1>{props.productPrice}</h1>
        </div>
        <a
          className="flex justify-around items-center uppercase text-xs cursor-pointer"
          onClick={props.onClick}>
          <h1>for Details</h1>
          <GoTriangleRight />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
