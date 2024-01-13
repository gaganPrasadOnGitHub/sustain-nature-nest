import React from 'react';
import dayIcon from '../../../assets/day.svg';
import nightIcon from '../../../assets/night.svg';
import useNightMode from '../../../hooks/useNightMode';

const NightMode = () => {
  const {isNight, handleToggleNightMode} = useNightMode();

  return (
    <img
      className="nav-icon"
      src={!isNight ? nightIcon : dayIcon}
      alt={isNight ? 'Switch to day view' : 'Switch to night view'}
      onClick={handleToggleNightMode}
    />
  );
};

export default NightMode;
