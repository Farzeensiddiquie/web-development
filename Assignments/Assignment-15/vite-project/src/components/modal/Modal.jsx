import React, { useState, useEffect } from "react";
import "./Modal.css"; // Ensure CSS is imported here

export default function Modal({ modalIsOpen, setIsOpen, recipe, onUpdate }) {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedImageFile, setUpdatedImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (recipe) {
      setUpdatedTitle(recipe.title);
      setUpdatedContent(recipe.content);
      setPreviewImage(recipe.imageUrl || "");
    }
  }, [recipe]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "todo-app"); // Cloudinary preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dlj5qr22y/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    if (updatedTitle.trim() === "" || updatedContent.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    let imageUrl = previewImage;

    if (updatedImageFile) {
      imageUrl = await handleImageUpload(updatedImageFile);
    }

    const updatedRecipe = {
      ...recipe,
      title: updatedTitle,
      content: updatedContent,
      imageUrl,
    };

    onUpdate(updatedRecipe);
  };

  if (!modalIsOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Update Recipe</h2>

        <input
          className="modal-input"
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="modal-textarea"
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          placeholder="Content"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setUpdatedImageFile(file);
            if (file) {
              setPreviewImage(URL.createObjectURL(file)); // local preview
            }
          }}
        />

        {previewImage && (
          <img
            className="modal-preview"
            src={previewImage}
            alt="Preview"
          />
        )}

        <div className="modal-buttons">
          <button className="modal-btn" onClick={handleSubmit}>
            Update
          </button>
          <button
            className="modal-btn cancel"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
