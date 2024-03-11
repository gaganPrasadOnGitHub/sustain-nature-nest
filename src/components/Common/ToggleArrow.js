import React from 'react';
import upArrowNight from '../../assets/upArrowNight.svg';
import upArrowDay from '../../assets/upArrowGreen.svg';
import useNightMode from '../../hooks/useNightMode';

const ToggleArrow = ({isActive}) => {
  const {isNight} = useNightMode();
  return (
    <img
      className={`ml-8 cursor-pointer toggle-arrow ${
        isActive ? 'rotate-180' : ''
      } `}
      src={isNight ? upArrowNight : upArrowDay}
      alt="toggle"
    />
  );
};

export default ToggleArrow;
