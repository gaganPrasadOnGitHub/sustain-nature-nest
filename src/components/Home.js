import React from 'react';
import Header from './Header/Header';
import SearchComponent from './SearchComponent/SearchComponent';
import Footer from './Footer/Footer';
import useNightMode from '../hooks/useNightMode';
import WasteBinCard from './WasteBinCard/WasteBinCard';
import VerticalPageScroll from './Common/VerticalPageScroll';
import BinItemsCarousel from './BinItemsCarousel/BinItemsCarousel';
import Note from './Common/Note';
import useIsMobileView from '../hooks/useIsMobileView';

const Home = () => {
  const {isNight} = useNightMode();
  const isMobileView = useIsMobileView();

  return (
    <div className={`app-container ${isNight ? 'night-mode' : ''} `}>
      <div className="header-sticky-wrapper">
        <Header />
        <SearchComponent />
      </div>
      <div className="container">
        <WasteBinCard />
        <BinItemsCarousel />
        <VerticalPageScroll />
        {isMobileView && <Note />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
