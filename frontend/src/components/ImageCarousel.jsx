import React, { createRef, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const ImageCarousel = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = props.productImages.length;
  const refs = props.productImages.reduce((acc, val, idx) => {
    acc[idx] = createRef();
    return acc;
  }, {});
  const arrowStyle =
    'absolute text-white text-2xl z-10 bg-gradient-to-r from-main-color to-main-light text-white h-10 w-10 rounded-full flex items-center justify-center';
  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  };
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };
  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };
  const sliderControl = (isLeft) => {
    return (
      <button
        type="button"
        onClick={isLeft ? previousImage : nextImage}
        className={`${arrowStyle} ${isLeft ? 'left-2' : 'right-2'}`}
        style={{ top: '40%' }}>
        <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
          {isLeft ? <AiFillCaretLeft /> : <AiFillCaretRight />}
        </span>
      </button>
    );
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full h-96">
        <div className="w-full h-full overflow-hidden rounded-lg flex">
          {sliderControl(true)}
          {props.productImages.map((img, i) => (
            <div
              className="w-full h-80 p-6 flex-shrink-0"
              key={img}
              ref={refs[i]}
              data-carousel-item>
              <img src={img} className="w-full object-contain h-80" />
            </div>
          ))}
          {sliderControl(false)}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
