import React from 'react';
import Header from './Header/Header';
import SearchComponent from './SearchComponent/SearchComponent';
import Footer from './Footer/Footer';
import useNightMode from '../hooks/useNightMode';
import DisplayCard from './DisplayCard/DisplayCard';

const Home = () => {
  const {isNight} = useNightMode();

  return (
    <div className={`app-container ${isNight ? 'night-mode' : ''}`}>
      <div className="container">
        <div className="sticky-top-wrapper">
          <Header />
          <SearchComponent />
        </div>
        <DisplayCard />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
