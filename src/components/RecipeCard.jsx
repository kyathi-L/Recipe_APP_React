import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, onDelete }) {



  const handleDeleteClick = (id) => {
    // Confirm delete operation
    // if (window.confirm("Are you sure you want to delete this recipe?")) {
    //   // Call the onDelete function passed as a prop, passing the recipe ID
    //   onDelete(recipe.id);
    // }
    axios.delete(`http://localhost:5000/recipes/${id}`)
    .then(()=>{
      console.log("deleted")
      alert("deleted")
      window.location.assign('/')
    })
    .catch(()=>{
      console.log("error")
    })
  };

  return (
    <div className="card shadow-sm mb-4" style={{ borderRadius: "15px" }}>
      <img
        src={recipe.imageLink}
        className="card-img-top"
        alt={`Image of ${recipe.title}`}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{recipe.title}</h5>
        <p className="card-text text-muted">
          {recipe.description.length > 50
            ? recipe.description.substring(0, 50) + "..."
            : recipe.description}
        </p>
        <Link
          to={`/recipes/${recipe.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Recipe
        </Link>
        <Link
          to={`/edit/${recipe.id}`}
          className="btn btn-outline-secondary btn-sm mx-2"
        >
          Edit
        </Link>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={()=>handleDeleteClick(recipe.id)} // Trigger delete on click
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
