const API_URL = 'http://localhost:5000/recipes';

export const fetchRecipes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createRecipe = async (recipe) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
};
