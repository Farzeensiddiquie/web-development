import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../features/counter/AddRecipesSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Recipe() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);  // Added loading state to handle async operations

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/Recipes");
    };

    const onClickHandler = async () => {
        if (title.trim() === "" || content.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        if (!image) {
            alert("Please upload an image");
            return;
        }

        const newRecipe = {
            title,
            content,
            imageUrl: image,
            createdAt: new Date().toISOString(),
        };

        setLoading(true); // Set loading to true while dispatching

        await dispatch(createRecipe(newRecipe));
        setLoading(false); // Set loading to false after dispatch

        goBack();
    };

    const onChangeImageHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);  // Set loading to true when image is being uploaded

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "todo-app");

            const response = await fetch("https://api.cloudinary.com/v1_1/dlj5qr22y/image/upload", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log("Uploaded Image URL: ", data.secure_url);
            setImage(data.secure_url);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }

        setLoading(false); // Set loading to false after image upload finishes
    };

    return (
        <div style={{ backgroundColor: "black", color: "white" }}>
            {/* Back Link */}
            <Link to="/Recipes" style={{
                textDecoration: "none",
                color: "black",
                fontSize: "1.5rem",
                marginLeft: "20px",
                marginTop: "20px",
                display: "inline-block"
            }}>Back</Link>

            <h1 style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "2rem",
                fontWeight: "bold"
            }}>Create Recipe</h1>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                marginTop: "20px"
            }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: "80%",
                        height: "50px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem"
                    }}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        width: "80%",
                        height: "200px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem"
                    }}
                />
                <input
                    type="file"
                    onChange={onChangeImageHandler}
                    style={{
                        width: "80%",
                        height: "50px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem"
                    }}
                />
                {image && <img src={image} alt="Uploaded" style={{ width: '100%', maxWidth: '300px', marginTop: '20px' }} />}
                {loading && <p>Uploading Image...</p>}  {/* Show loading text while image is uploading */}
                <button
                    onClick={onClickHandler}
                    style={{
                        width: "80%",
                        height: "50px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontSize: "1rem",
                        backgroundColor: "#007bff",
                        color: "white",
                        cursor: "pointer",
                        marginBottom: "20px",
                    }}
                    disabled={loading}  
                >
                    Create Recipe
                </button>
            </div>
        </div>
    );
}
