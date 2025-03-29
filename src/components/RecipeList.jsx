import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState([]); // List of recipes
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from the backend API using Axios
  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes.");
        setLoading(false);
      });
  }, []);

  // Handle Delete Recipe
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <SearchBar setRecipes={setRecipes} /> {/* Pass setRecipes for search filtering */}

      {/* Error Message */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div className="col-md-4" key={recipe.id}>
                <RecipeCard recipe={recipe} onDelete={handleDelete} />
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No recipes found!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
