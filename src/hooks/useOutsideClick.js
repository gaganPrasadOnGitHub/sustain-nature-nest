import {useEffect} from 'react';

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleInteraction = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
