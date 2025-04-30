import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../../features/counter/AddRecipesSlice";
import Modal from "../../components/modal/Modal";
import { Link } from "react-router-dom";

import "./Recipes.css";

export default function Recipe() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    recipes: firebaseRecipes = [],
    loading,
    error,
  } = useSelector((state) => state.firebaseRecipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  const onClickHandler = () => {
    if (title === "" || content === "") {
      alert("Please fill all fields");
      return;
    }

    const newRecipe = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    dispatch(createRecipe(newRecipe));
    setTitle("");
    setContent("");
  };

  const onClickDeleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
      setViewModalOpen(false);
    }
  };

  const onClickUpdateHandler = (updatedRecipe) => {
    dispatch(
      updateRecipe({ recipeId: updatedRecipe.id, recipeData: updatedRecipe })
    );
    setEditModalOpen(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Link
        to="/"
        style={{
          marginBottom: 20,
          display: "inline-block",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        + Create Recipe
      </Link>

      <h2>Firebase Recipes</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && firebaseRecipes.length === 0 && (
        <p>No recipes available in Firebase.</p>
      )}

      {/* Thumbnail Grid */}
      <div className="thumbnail-grid">
        {firebaseRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="thumbnail"
            onClick={() => {
              setViewRecipe(recipe);
              setViewModalOpen(true);
            }}
          >
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="thumbnail-img"
            />
            <h4 className="thumbnail-title">{recipe.title}</h4>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {viewModalOpen && viewRecipe && (
        <div className="custom-modal-overlay" onClick={() => setViewModalOpen(false)}>
          <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="elegant-card">
              {viewRecipe.imageUrl && (
                <div className="elegant-img-wrap">
                  <img
                    src={viewRecipe.imageUrl}
                    alt={viewRecipe.title}
                    className="elegant-img"
                  />
                </div>
              )}
              <div className="elegant-content">
                <h2>{viewRecipe.title}</h2>
                <div className="elegant-meta">
                  <span>{new Date(viewRecipe.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="elegant-details">{viewRecipe.content}</div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button onClick={() => onClickDeleteHandler(viewRecipe.id)}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditingRecipe(viewRecipe);
                      setEditModalOpen(true);
                      setViewModalOpen(false);
                    }}
                  >
                    Update
                  </button>
                  <button onClick={() => setViewModalOpen(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        modalIsOpen={editModalOpen}
        setIsOpen={setEditModalOpen}
        recipe={editingRecipe}
        onUpdate={onClickUpdateHandler}
      />
    </div>
  );
}
