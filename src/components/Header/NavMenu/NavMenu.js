import React from 'react';
import './NavMenu.css';
import menu from '../../../assets/dayMenu.png';
import menuNight from '../../../assets/menuNight.png';
import wasteManagementData from '../../../data/bin.json';
import useNightMode from '../../../hooks/useNightMode';
import useNavMenu from '../../../hooks/useNavMenu';
import CategoryCard from '../../Common/CategoryCard/CategoryCard';
import useSelectedLanguage from '../../../hooks/useSelectedLanguage';
import {useTranslation} from 'react-i18next';

const NavMenu = () => {
  useSelectedLanguage();

  const {
    menuRef,
    isCategoryMenuVisible,
    activeMenuItem,
    subCategoryBins,
    selectedParentBin,
    handleMenuItemClick,
    handleToggleMenuVisibility,
  } = useNavMenu();

  const {t} = useTranslation();
  const {isNight} = useNightMode();

  return (
    <div ref={menuRef} className="flex-default">
      <img
        onClick={handleToggleMenuVisibility}
        className="nav-icon"
        src={isNight ? menuNight : menu}
        alt="Menu Icon"
      />

      {/* menu popup */}
      {isCategoryMenuVisible && (
        <div className="nav-menu popup">
          <div className="category-menu">
            {wasteManagementData?.wasteBins?.map(
              (bin) =>
                bin.isParent && (
                  <div
                    key={bin.id}
                    className={`menu-item category-menu-item ${
                      activeMenuItem === bin.id ? 'active' : ''
                    }`}
                    onClick={() => handleMenuItemClick(bin.id)}
                  >
                    {t(`wasteBins.${bin.id}.name`)}
                  </div>
                )
            )}
          </div>

          <div className="category-list">
            <CategoryCard data={selectedParentBin} />
            {subCategoryBins?.map((subCategoryBin) => (
              <div key={subCategoryBin.id} className="category-item">
                <CategoryCard data={subCategoryBin} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMenu;
