import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toggleNightMode, setNightMode} from '../utils/redux/appSlice';

const useNightMode = () => {
  const dispatch = useDispatch();
  const isNight = useSelector((state) => state.appData.isNightMode);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const isItNight = currentHour >= 18 || currentHour < 6;
    dispatch(setNightMode(isItNight));
  }, [dispatch]);

  const handleToggleNightMode = useCallback(() => {
    dispatch(toggleNightMode());
  }, [dispatch]);

  return {isNight, handleToggleNightMode};
};

export default useNightMode;
