import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Importing custom CSS

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching recipe details for ID:", id);

    fetch("http://localhost:5000/recipes")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const recipeData = data.find((r) => r.id.toString() === id);
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

  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!recipe) return <p className="text-center">Loading...</p>;

  return (
    <div className="recipe-container">
      {/* Image Section */}
      {recipe.imageLink && (
        <div className="recipe-image-container">
          <img src={recipe.imageLink} alt={recipe.title} className="recipe-image" />
        </div>
      )}

      {/* Card Body Section */}
      <div className="recipe-card">
        <div className="recipe-card-body">
          <h2 className="recipe-title">{recipe.title}</h2>
          <p className="recipe-description">{recipe.description}</p>

          <h4 className="recipe-section-title">Ingredients:</h4>
          <p className="recipe-ingredients">{recipe.ingredients}</p>

          <h4 className="recipe-section-title">Instructions:</h4>
          <ol className="recipe-instructions">
            {recipe.instructions && recipe.instructions.length > 0 ? (
              recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))
            ) : (
              <p>No instructions available</p>
            )}
          </ol>

          <Link to="/" className="btn btn-primary recipe-back-btn">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
