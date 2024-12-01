import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";

function RecipeList() {
  const [recipes, setRecipes] = useState([]); // List of recipes
  const [search, setSearch] = useState(""); // Search query

  // Fetch recipes from the backend API
  useEffect(() => {
    fetch("/recipes") // Proxy forwards this to http://localhost:5000/recipes
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // handleDelete function (defined in RecipeList)
  const handleDelete = (id) => {
    fetch(`/recipes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete recipe.");
        // Update the state by removing the deleted recipe
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== id)
        );
        alert("Recipe deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
        alert("Failed to delete recipe. Please try again.");
      });
  };

  // Filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container my-5">
      <SearchBar search={search} setSearch={setSearch} />
      <div className="row mt-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              {/* Pass handleDelete function as a prop */}
              <RecipeCard recipe={recipe} onDelete={handleDelete} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No recipes found!</p>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
