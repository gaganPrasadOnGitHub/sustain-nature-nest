import {useEffect} from 'react';

const useOutsideOrScrollHide = (ref, callback) => {
  useEffect(() => {
    const handleInteraction = (event) => {
      // Determine if the event target is outside the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listeners for click and scroll
    document.addEventListener('click', handleInteraction);
    // Capture scroll event at the document level
    document.addEventListener('scroll', handleInteraction, true);

    return () => {
      // Remove event listeners on cleanup
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction, true);
    };
  }, [ref, callback]);
};

export default useOutsideOrScrollHide;
