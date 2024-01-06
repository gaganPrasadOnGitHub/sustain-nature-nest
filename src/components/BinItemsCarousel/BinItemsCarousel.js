import React from 'react';
import './BinItemsCarousel.css';
import Slider from 'react-slick';
import {NextArrow, PrevArrow} from './CarouselArrows';

const BinItemsCarousel = ({selectedBin, searchTerm}) => {
  const settings = {
    button: false,
    className: 'slider',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    swipe: true,
    autoplaySpeed: 3000,
    variableWidth: true,
    arrows: true,
    pauseOnHover: true,
    useCss: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    selectedBin && (
      <div className="slider-container">
        <p className="text-subheading text-right mb-8">
          What makes up {selectedBin?.name?.toLowerCase()}
        </p>
        <Slider {...settings}>
          {searchTerm && <div className="slider-item">{searchTerm}</div>}
          {selectedBin?.content?.map((item, index) => (
            <div key={index} className="slider-item">
              {item}
            </div>
          ))}
        </Slider>
      </div>
    )
  );
};

export default BinItemsCarousel;
