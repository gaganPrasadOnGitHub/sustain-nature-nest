import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import './Slider.css';
import useSlider from '../../hooks/useSlider';

const Slider = ({items}) => {
  const sliderRef = useSlider();
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const slider = sliderRef.current;
      const center = slider.offsetWidth / 2 + slider.scrollLeft;

      itemsRef.current.forEach((item) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(center - itemCenter);
        const scale = Math.max(1 - distance / 500, 0.6); // scale items based on distance from center
        item.style.transform = `scale(${scale})`;
      });
    };

    const slider = sliderRef.current;
    slider.addEventListener('scroll', handleScroll);

    // Trigger initial scaling
    handleScroll();

    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="slider-container" ref={sliderRef}>
      <div className="slider">
        {items.map((item, index) => (
          <div
            key={index}
            className="slider-item"
            ref={(el) => (itemsRef.current[index] = el)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Slider;
