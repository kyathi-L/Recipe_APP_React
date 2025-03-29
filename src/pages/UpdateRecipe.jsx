import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/custom.css'; // Import the custom.css file
function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    imageLink: "",
    ingredients: "",
    instructions: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe data");
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipe.title.trim() || !recipe.ingredients.trim()) {
      alert("Title and ingredients cannot be empty.");
      return;
    }
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update recipe");
        }
        alert("Recipe updated successfully!");
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="body-background">
      <div className="recipe-update-card">
        <h2 className="mb-4">Update Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imageLink" className="form-label">Image Link</label>
            <input
              type="url"
              className="form-control"
              id="imageLink"
              name="imageLink"
              value={recipe.imageLink}
              onChange={handleChange}
            />
            {recipe.imageLink && (
              <div className="text-center">
                <img src={recipe.imageLink} alt="Recipe" />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            <textarea
              className="form-control"
              id="ingredients"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instructions (One step per line)
            </label>
            <textarea
              className="form-control"
              id="instructions"
              name="instructions"
              value={recipe.instructions.join("\n")}
              onChange={(e) =>
                setRecipe({ ...recipe, instructions: e.target.value.split("\n") })
              }
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateRecipe;
