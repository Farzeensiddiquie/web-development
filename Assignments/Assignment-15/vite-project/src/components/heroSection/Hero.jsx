import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Hero.css";
import { fetchRecipes, fetchRecipesBySearch } from "../../features/counter/RecipesSlice";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Instant search when typing
    if (value.trim() === '') {
      dispatch(fetchRecipes()); // show all when empty
    } else {
      dispatch(fetchRecipesBySearch(value)); // search live
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      dispatch(fetchRecipes()); // show all when empty
    } else {
      dispatch(fetchRecipesBySearch(searchTerm)); // search when button clicked
    }
  };

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
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search recipes..."
          />
          <button onClick={handleSearchClick}>Search</button> {/* Search button */}
        </div>
      </div>
    </header>
  );
};

export default Hero;
