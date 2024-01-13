import React from 'react';
import './BinItemsCarousel.css';
import Slider from 'react-slick';
import wasteData from '../../data/bin.json';
import {NextArrow, PrevArrow} from './CarouselArrows';
import CategoryCard from '../Common/CategoryCard/CategoryCard';

const BinItemsCarousel = () => {
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
    wasteData && (
      <div className="slider-container">
        <p className="text-subheading mb-8">Also know about</p>
        <Slider {...settings}>
          {wasteData?.wasteBins?.map((item, index) => (
            <CategoryCard key={index} data={item} />
          ))}
        </Slider>
      </div>
    )
  );
};

export default BinItemsCarousel;
