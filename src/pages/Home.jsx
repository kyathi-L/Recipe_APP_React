import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch recipes from the server
    fetch('http://localhost:5000/recipes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log the recipes to ensure all data is fetched
        setRecipes(data); // Assuming the response is an array of recipes
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container my-5">
      {/* Page Heading */}
      <h1 className="text-center fw-bold text-secondary">🫕 Flavour O Fest..🍜</h1>
      <p className="text-center text-muted mb-4">
        Discover amazing recipes shared by our community!
      </p>
      {/* Search Bar */}
      <SearchBar search={search} setSearch={setSearch} />
      {/* Error Message */}
      {error && <p className="text-danger text-center">{error}</p>}
      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {/* Recipe List */}
      <div className="row mt-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="col-md-4 col-sm-6 col-xs-12 recipe-card" key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            {error ? 'Unable to load recipes!' : 'No recipes found!'}
          </p>
        )}
      </div>
    </div>
  );
}
export default Home;
