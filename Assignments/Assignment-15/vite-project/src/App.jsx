import React from 'react'
import './App.css'
import Gallery from './components/recipesgallery/Gallery';
import Footer from './components/footer/Footer';
import Hero from './components/heroSection/Hero';
const App = () => {
 
  return (
   <>
   <Hero/>
      <Gallery />
      <Footer/>
      </>
  );
};

export default App;
