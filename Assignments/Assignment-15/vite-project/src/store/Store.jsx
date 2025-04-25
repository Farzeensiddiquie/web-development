import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../features/counter/RecipesSlice';

const store = configureStore({
  reducer: {
    recipes: recipesReducer
  }
});

export default store;
