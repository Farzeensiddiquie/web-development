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
    <>
      <Navbar />
      <div className="recipes-wrapper">
      <div style={{ padding: 20 }}>
        <h2>Your Recipes</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!loading && firebaseRecipes.length === 0 && <p>No recipes available.</p>}

        <div className="thumbnail-grid">
          {firebaseRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="thumbnail"
              onClick={() => {
                setChecked({ ingredients: new Set(), instructions: new Set() });
                setViewRecipe(recipe);
                setViewModalOpen(true);
              }}
            >
              <img
                src={recipe.image || "https://via.placeholder.com/300x200"}
                alt={recipe.title || "Untitled"}
                className="thumbnail-img"
              />
              <h4 className="thumbnail-title">{recipe.title || "Untitled"}</h4>
            </div>
          ))}
        </div>

        {viewModalOpen && viewRecipe && (
          <div className="custom-modal-overlay" onClick={() => setViewModalOpen(false)}>
            <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="elegant-card">
                <div className="elegant-img-wrap">
                  <img
                    src={viewRecipe.image || "https://via.placeholder.com/300x200"}
                    alt={viewRecipe.title || "Untitled"}
                    className="elegant-img"
                  />
                </div>

                <div className="elegant-content">
                  <Logo/>
                  <h2>{viewRecipe.title || "Untitled Recipe"}</h2>

                  {viewRecipe.mealType?.[0] && (
                    <p className="meal-type" data-type={viewRecipe.mealType[0]}>
                       {viewRecipe.mealType[0]}
                    </p>
                  )}

                  <div className="elegant-meta">
                    <span>
                      {viewRecipe.createdAt
                        ? new Date(viewRecipe.createdAt).toLocaleDateString()
                        : "Date Unknown"}
                    </span>
                    <span className="rating">⭐ 4.5 (100)</span>
                  </div>

                  <div className="elegant-tags">
                    {viewRecipe.tags?.map((tag, idx) => (
                      <span key={idx} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="elegant-details">
                    {viewRecipe.prepTimeMinutes && (
                      <span><strong>Prep:</strong> {viewRecipe.prepTimeMinutes} min</span>
                    )}
                    {viewRecipe.cookTimeMinutes && (
                      <span><strong>Cook:</strong> {viewRecipe.cookTimeMinutes} min</span>
                    )}
                    {viewRecipe.servings && (
                      <span><strong>Serves:</strong> {viewRecipe.servings}</span>
                    )}
                    {viewRecipe.caloriesPerServing && (
                      <span><strong>Calories:</strong> {viewRecipe.caloriesPerServing}</span>
                    )}
                  </div>

                  <div className="elegant-section">
                    <h3>🛒 Ingredients</h3>
                    {viewRecipe.ingredients?.map((item, idx) => (
                      <label
                        key={idx}
                        className={`checkbox ${checked.ingredients.has(idx) ? "checked" : ""}`}
                      >
                        <input type="checkbox" onChange={() => toggleCheck("ingredients", idx)} />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>

                  <div className="elegant-section">
                    <h3>👨‍🍳 Instructions</h3>
                    {viewRecipe.instructions?.map((step, idx) => (
                      <label
                        key={idx}
                        className={`checkbox ${checked.instructions.has(idx) ? "checked" : ""}`}
                      >
                        <input type="checkbox" onChange={() => toggleCheck("instructions", idx)} />
                        <span>{step}</span>
                      </label>
                    ))}
                  </div>

                  <div className="modal-buttons">
                    <button
                      className="delete-btn"
                      style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={() => handleDelete(viewRecipe.id)}
                    >
                      <FontAwesomeIcon
                        className="icon"
                        style={{ color: '#f02929', fontSize: "20px" }}
                        icon={faTrashCan}
                      />
                    </button>
                    <button
                      className="edit-btn"
                      style={{ backgroundColor: "transparent", border: "none" }}
                      onClick={() => {
                        setEditingRecipe(viewRecipe);
                        setEditModalOpen(true);
                        setViewModalOpen(false);
                      }}
                    >
                      <FontAwesomeIcon
                        style={{ color: "#66bb6a", fontSize: "20px" }}
                        icon={faPenToSquare}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Modal
          modalIsOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          recipe={editingRecipe}
          onUpdate={handleUpdate}
        />
      </div>
      </div>
    </>
  );
}
