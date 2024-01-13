import {useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setMenuVisibility, toggleMenuVisibility} from '../utils/redux/appSlice';
import useClickOutside from './useClickOutside';
import useGetBinById from './useGetBinById';

const useNavMenu = () => {
  const menuRef = useRef(null);
  const isMenuVisible = useSelector((state) => state.appData.isMenuVisible);
  const dispatch = useDispatch();
  const getBinById = useGetBinById;
  const [selectedParentBin, setSelectedParentBin] = useState(getBinById('001'));
  const [activeMenuItem, setActiveMenuItem] = useState('001');

  const subCategoryBins = useMemo(
    () =>
      selectedParentBin?.subCategoryIds
        ?.map((subCatId) => getBinById(subCatId))
        ?.filter((bin) => bin) || [],
    [selectedParentBin, getBinById]
  );

  const handleMenuItemClick = (binId) => {
    const parentBin = getBinById(binId);
    setSelectedParentBin(parentBin);
    setActiveMenuItem(binId);
  };

  useClickOutside(menuRef, () => {
    dispatch(setMenuVisibility(false));
    document.body.classList.remove('no-scroll');
  });

  const handleToggleMenuVisibility = (event) => {
    event.stopPropagation();
    const shouldPreventScroll = !isMenuVisible;
    dispatch(toggleMenuVisibility());
    if (shouldPreventScroll) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  return {
    menuRef,
    isMenuVisible,
    activeMenuItem,
    subCategoryBins,
    selectedParentBin,
    handleMenuItemClick,
    handleToggleMenuVisibility,
  };
};

export default useNavMenu;
