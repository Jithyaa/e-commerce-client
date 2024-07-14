import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import '../scss/styles/home.scss'

const Home = () => {
  return (
    <div className="main-container">
      <Navbar />
      <Announcement />
      <Slider />
      <div style={{ marginBottom: '2rem' }} />
      <Footer />
    </div>
  );
};

export default Home
