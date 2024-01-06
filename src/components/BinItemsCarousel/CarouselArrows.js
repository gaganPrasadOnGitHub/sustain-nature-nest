import React from 'react';
import upArrow from '../../assets/upArrow.svg';
import upArrowGreen from '../../assets/upArrowGreen.svg';
import useNightMode from '../../hooks/useNightMode';

export const NextArrow = (props) => {
  const {className, onClick} = props;
  const {isNight} = useNightMode();
  return (
    <div className={`${className} scroll-arrow`} onClick={onClick}>
      <img src={isNight ? upArrow : upArrowGreen} alt="Next" />
    </div>
  );
};

export const PrevArrow = (props) => {
  const {className, onClick} = props;
  const {isNight} = useNightMode();
  return (
    <div className={`${className} scroll-arrow`} onClick={onClick}>
      <img src={isNight ? upArrow : upArrowGreen} alt="Previous" />
    </div>
  );
};
