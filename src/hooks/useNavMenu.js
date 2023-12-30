import {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMenuVisibility, toggleMenuVisibility} from '../utils/redux/appSlice';
import useClickOutside from './useClickOutside';

const useNavMenu = () => {
  const menuRef = useRef(null);
  const isMenuVisible = useSelector((state) => state.appData.isMenuVisible);
  const [activeBinId, setActiveBinId] = useState('001');
  const dispatch = useDispatch();

  useClickOutside(menuRef, () => {
    dispatch(setMenuVisibility(false));
    setActiveBinId('001');
  });

  const handleToggleMenuVisibility = (event) => {
    event.stopPropagation();
    if (!isMenuVisible) {
      console.log('isMenuVisible', isMenuVisible);
      setActiveBinId('001');
    }
    dispatch(toggleMenuVisibility());
  };

  const handleNavItemClick = (binId) => {
    setActiveBinId(binId);
    const element = document?.getElementById(`bin-${binId}`);
    const navMenuContainer = menuRef?.current;

    if (element && navMenuContainer) {
      const offsetTop = element.offsetTop;
      navMenuContainer.scrollTop = offsetTop - 16;
    }
  };

  return {
    menuRef,
    isMenuVisible,
    activeBinId,
    handleToggleMenuVisibility,
    handleNavItemClick,
  };
};

export default useNavMenu;
