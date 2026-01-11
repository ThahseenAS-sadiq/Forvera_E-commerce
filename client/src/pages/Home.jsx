import React from 'react'
import Hero from '../components/Hero'
import Brand from '../components/Brand';
import ShopByCategory from '../components/ShopByCategory';
import NewArrival from '../components/NewArrival';
import TrendingNow from '../components/Trending';
import OfferBar from '../components/OfferBar';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import OurPolicy from '../components/OurPolicy';

const Home = () => {
  return (
    <div>
      <Hero />
      <Brand />
      <ShopByCategory />
      <NewArrival />
      <TrendingNow />
      <OurPolicy />
      <OfferBar />
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Home;