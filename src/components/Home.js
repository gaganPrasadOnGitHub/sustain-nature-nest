import React from 'react';
import Header from './Header/Header';
import SearchComponent from './SearchComponent/SearchComponent';
import Footer from './Footer/Footer';
import useNightMode from '../hooks/useNightMode';
import WasteBinCard from './WasteBinCard/WasteBinCard';
import VerticalPageScroll from './Common/VerticalPageScroll';
import BinItemsCarousel from './BinItemsCarousel/BinItemsCarousel';

const Home = () => {
  const {isNight} = useNightMode();

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
      </div>

      <Footer />
    </div>
  );
};

export default Home;
