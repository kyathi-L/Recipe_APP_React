import { useState } from 'react';
import '../styles/custom.css';
function CreateRecipe({ addRecipe }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !ingredients || !instructions) {
      setError('All fields are required');
      return;
    }

    const newRecipe = {
      title,
      description,
      ingredients,
      instructions: instructions.split('\n'),
      imageLink,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to submit recipe');
      }

      const data = await response.json();
      addRecipe(data);

      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setImageLink('');
      setError(null);

      alert('Recipe created successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-recipe-container">
      <div className="create-recipe-form">
        <h2>Create a New Recipe</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageLink">Image Link</label>
            <input
              type="url"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
