import React, {useRef, useEffect, useState} from 'react';
import './ScrollAnimation.css';

const ScrollAnimation = ({children}) => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`scroll-animation ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation;
