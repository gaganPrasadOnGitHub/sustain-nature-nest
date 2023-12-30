import React from 'react';
import './NavMenu.css';
import menu from '../../assets/menu.png';
import menuNight from '../../assets/menuNight.png';
import wasteManagementData from '../../data/bin.json';
import CategoryCard from '../CategoryCard/CategoryCard';
import useNightMode from '../../hooks/useNightMode';
import useNavMenu from '../../hooks/useNavMenu';

const NavMenu = () => {
  const {isNight} = useNightMode();
  const {
    menuRef,
    isMenuVisible,
    activeBinId,
    handleToggleMenuVisibility,
    handleNavItemClick,
  } = useNavMenu();

  return (
    <>
      <img
        className="nav-icon"
        src={isNight ? menuNight : menu}
        alt="menu"
        onClick={handleToggleMenuVisibility}
      />
      {isMenuVisible && (
        <div className="nav-menu" ref={menuRef}>
          <div className="category-main">
            {wasteManagementData.wasteBins?.map(
              (bin, index) =>
                bin?.isParent && (
                  <div
                    className={`nav-item ${
                      bin?.id === activeBinId ? 'active' : ''
                    }`}
                    key={index}
                    onClick={() => handleNavItemClick(bin?.id)}
                  >
                    {bin?.name}
                  </div>
                )
            )}
          </div>
          <div className="category-list">
            {wasteManagementData.wasteBins?.map((bin, index) => (
              <React.Fragment key={index}>
                {bin.isParent && (
                  <div
                    id={`bin-${bin?.id}`}
                    className="breakpoint text-heading"
                  >
                    {bin?.name}
                    <br />
                  </div>
                )}
                <CategoryCard data={bin} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavMenu;
