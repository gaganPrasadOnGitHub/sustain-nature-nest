import React from 'react';
import upArrowNight from '../../assets/upArrowNight.svg';
import upArrowDay from '../../assets/upArrowGreen.svg';
import useNightMode from '../../hooks/useNightMode';

export const NextArrow = (props) => {
  const {className, onClick} = props;
  const {isNight} = useNightMode();
  return (
    <div className={`${className} scroll-arrow`} onClick={onClick}>
      <img src={isNight ? upArrowNight : upArrowDay} alt="Next" />
    </div>
  );
};

export const PrevArrow = (props) => {
  const {className, onClick} = props;
  const {isNight} = useNightMode();
  return (
    <div className={`${className} scroll-arrow`} onClick={onClick}>
      <img src={isNight ? upArrowNight : upArrowDay} alt="Previous" />
    </div>
  );
};
