import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setFocusScroll, setNightMode} from '../utils/redux/appSlice';

const useNightMode = () => {
  const dispatch = useDispatch();
  const isNight = useSelector((state) => state.appData.isNightMode);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const isItNight = currentHour >= 18 || currentHour < 6;
    dispatch(setNightMode(isItNight));
  }, [dispatch]);

  const handleToggleNightMode = useCallback(() => {
    dispatch(setNightMode(!isNight));
    dispatch(setFocusScroll(false));
  }, [dispatch, isNight]);

  return {isNight, handleToggleNightMode};
};

export default useNightMode;
