import {useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setFocusScroll,
  setIsCategoryMenuVisible,
} from '../utils/redux/appSlice';
import useGetBinById from './useGetBinById';
import useOutsideOrScrollHide from './useOutsideOrScrollHide';

const useNavMenu = () => {
  const menuRef = useRef(null);
  const isCategoryMenuVisible = useSelector(
    (state) => state.appData.isCategoryMenuVisible
  );
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

  useOutsideOrScrollHide(menuRef, () => {
    if (menuRef) {
      dispatch(setIsCategoryMenuVisible(false));
      dispatch(setFocusScroll(false));
    }
  });

  const handleToggleMenuVisibility = (event) => {
    event.stopPropagation();
    dispatch(setIsCategoryMenuVisible(!isCategoryMenuVisible));
    dispatch(setFocusScroll(!isCategoryMenuVisible));
  };

  return {
    menuRef,
    isCategoryMenuVisible,
    activeMenuItem,
    subCategoryBins,
    selectedParentBin,
    handleMenuItemClick,
    handleToggleMenuVisibility,
  };
};

export default useNavMenu;
