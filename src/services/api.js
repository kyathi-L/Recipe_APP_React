// services/api.js
const API_URL = 'http://localhost:5000';

export const fetchRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await axios.post(`${API_URL}/recipes`, recipeData);
  return response.data;
};