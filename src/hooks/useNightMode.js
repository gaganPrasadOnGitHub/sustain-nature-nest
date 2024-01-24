import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setNightMode} from '../utils/redux/appSlice';

const useNightMode = () => {
  const dispatch = useDispatch();
  const isNight = useSelector((state) => state.appData.isNightMode);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (isNight === null) {
      const isItNight = currentHour >= 18 || currentHour < 6;
      dispatch(setNightMode(isItNight));
    }
  }, [dispatch, isNight]);

  const handleToggleNightMode = useCallback(() => {
    dispatch(setNightMode(!isNight));
  }, [dispatch, isNight]);

  return {isNight, handleToggleNightMode};
};

export default useNightMode;
