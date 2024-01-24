import React, {useState, useEffect} from 'react';
import upArrowNight from '../../assets/upArrowNight.svg';
import upArrowDay from '../../assets/upArrowGreen.svg';
import useNightMode from '../../hooks/useNightMode';

const VerticalPageScroll = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMiddleVisible, setIsMiddleVisible] = useState(false);
  const {isNight} = useNightMode();

  const toggleVisibility = () => {
    const scrolled = window.scrollY;
    setIsVisible(scrolled > 300);
    setIsMiddleVisible(
      scrolled >= 20 &&
        scrolled < document.body.scrollHeight - window.innerHeight
    );
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollDown = () => {
    window.scrollBy({
      top: 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          id="scrollToTop"
          className="scroll-arrow"
          onClick={handleScrollToTop}
        >
          <img src={isNight ? upArrowNight : upArrowDay} alt="Scroll to Top" />
        </div>
      )}
      {isMiddleVisible && (
        <div
          id="scrollDown"
          className="scroll-arrow"
          onClick={handleScrollDown}
        >
          <img src={isNight ? upArrowNight : upArrowDay} alt="Scroll Down" />
        </div>
      )}
    </>
  );
};

export default VerticalPageScroll;
