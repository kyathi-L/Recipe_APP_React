import React, { useState } from "react";
import axios from "axios";

function SearchBar({ setRecipes }) {
  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === "") {
      // Fetch all recipes if search is empty
      try {
        const response = await axios.get("http://localhost:5000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/recipes");
      const filteredRecipes = response.data.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
      setRecipes(filteredRecipes);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search for recipes..."
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
