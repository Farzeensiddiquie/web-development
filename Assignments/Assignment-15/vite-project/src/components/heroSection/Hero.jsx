import React, { useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="hero-container">
      <nav className="navbar">
        <div className="logo">🍳 RecipeGallery</div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#home">Home</a>
          <a href="#recipes">Recipes</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      </nav>

      <div className="hero-content">
        <h1>Find Your Next Favorite Recipe</h1>
        <p>From quick snacks to gourmet meals, search your cravings now!</p>
        <div className="search-bar">
          <input type="text" placeholder="Search recipes..." />
          <button>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Hero;

