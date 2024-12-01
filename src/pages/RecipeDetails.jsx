import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams(); // Extract recipe id from URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching recipe details for ID:", id);

    // Fetch recipes from the server
    fetch("http://localhost:5000/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Debug: Log fetched data
        const recipeData = data.find((r) => r.id.toString() === id); // Match id as a string
        if (recipeData) {
          setRecipe(recipeData);
        } else {
          setError("Recipe not found");
        }
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      });
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>; // Display error message
  if (!recipe) return <p>Loading...</p>; // Show loading state while data is being fetched

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        {/* Display the recipe image */}
        {recipe.imageLink && (
          <img
            src={recipe.imageLink}
            alt={recipe.title}
            className="card-img-top"
            style={{ borderRadius: "15px 15px 0 0" }}
          />
        )}

        <div className="card-body">
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>

          <h4>Ingredients:</h4>
          <p>{recipe.ingredients}</p>

          <h4>Instructions:</h4>
          <ol>
            {recipe.instructions && recipe.instructions.length > 0 ? (
              recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <p>No instructions available</p>
            )}
          </ol>

          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
