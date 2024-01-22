import {useState, useEffect} from 'react';

const useDynamicFontSize = () => {
  const [fontSize, setFontSize] = useState('initialScrollFontSize');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let newFontSize = 'initialScrollFontSize';
      if (scrollPosition > 99) {
        newFontSize = 'smallerScrollFontSize';
      }
      setFontSize(newFontSize);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return fontSize;
};

export default useDynamicFontSize;
