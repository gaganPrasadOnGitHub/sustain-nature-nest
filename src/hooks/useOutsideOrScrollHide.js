import {useEffect} from 'react';

const useOutsideOrScrollHide = (ref, callback) => {
  useEffect(() => {
    const handleInteraction = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction, true);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction, true);
    };
  }, [ref, callback]);
};

export default useOutsideOrScrollHide;
