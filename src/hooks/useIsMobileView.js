import {useState, useEffect} from 'react';

const useIsMobileView = (maxWidth = 768) => {
  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= maxWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [maxWidth]);

  return isMobileView;
};

export default useIsMobileView;
