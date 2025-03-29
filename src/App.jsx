import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import UpdateRecipe from './pages/UpdateRecipe';
import RecipeDetails from './pages/RecipeDetails';
import RecipeList from './components/RecipeList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/edit/:id" element={<UpdateRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </div>
  );
}

export default App;
