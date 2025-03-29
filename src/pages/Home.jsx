import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import "../styles/custom.css";

function Home() {
  const [recipes, setRecipes] = useState([]); // List of recipes
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from backend API using Axios
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

  return (
    <div className="container my-5">
      {/* Page Heading */}
      <h1 className="text-center fw-bold text-secondary">
        Flavour O Fest..
        <img src="https://cdn-icons-png.flaticon.com/128/1999/1999722.png" className="icon" alt="icon" />
      </h1>
      <p className="text-center text-muted mb-4">
        Discover amazing recipes shared by our community!
      </p>

      {/* Search Bar */}
      <SearchBar setRecipes={setRecipes} />

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
              <div className="col-md-4 col-sm-6 col-xs-12 recipe-card" key={recipe.id}>
                <RecipeCard recipe={recipe} />
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

export default Home;
