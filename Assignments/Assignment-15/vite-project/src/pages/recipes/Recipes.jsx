// Recipes.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../features/counter/AddRecipesSlice";
import Modal from "../../components/modal/Modal";
import Navbar from "../../components/navbar/Navbar";
import "./Recipes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/logo/Logo";

export default function Recipes() {
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [checked, setChecked] = useState({
    ingredients: new Set(),
    instructions: new Set(),
  });

  const dispatch = useDispatch();
  const {
    recipes: firebaseRecipes = [],
    loading,
    error,
  } = useSelector((state) => state.firebaseRecipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const toggleCheck = (type, index) => {
    const updated = new Set(checked[type]);
    updated.has(index) ? updated.delete(index) : updated.add(index);
    setChecked((prev) => ({ ...prev, [type]: updated }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
      setViewModalOpen(false);
    }
  };

  const handleUpdate = (updatedRecipe) => {
    dispatch(updateRecipe({ recipeId: updatedRecipe.id, recipeData: updatedRecipe }));
    setEditModalOpen(false);
  };

  return (
    <div className="create-recipe-container">
      <h1>Create Recipe</h1>
      <div className="create-recipe-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Ingredients (one per line)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <textarea
          placeholder="Instructions (one per line)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="row-inputs">
          <input
            type="number"
            placeholder="Prep Time (min)"
            value={prepTimeMinutes}
            onChange={(e) => setPrepTimeMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cook Time (min)"
            value={cookTimeMinutes}
            onChange={(e) => setCookTimeMinutes(e.target.value)}
          />
        </div>

        <div className="row-inputs">
          <input
            type="number"
            placeholder="Servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories/Serving"
            value={caloriesPerServing}
            onChange={(e) => setCaloriesPerServing(e.target.value)}
          />
        </div>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>

        <input type="file" onChange={onChangeImageHandler} />
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="preview-img"
            onError={handleImageError} // In case of error, show fallback image
          />
        )}
        {loading && <p>Uploading...</p>}
        <button onClick={onClickHandler} disabled={loading}>
          {loading ? "Creating..." : "Create Recipe"}
        </button>
      </div>
    </div>
  );
}
 