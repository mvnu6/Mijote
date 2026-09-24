import { useParams, Link } from 'react-router';
import { useFetch } from '../hooks/useFetch';
import { getRecipeById } from '../services/api';
import { Recipe } from '../types';
import { useShoppingListState, useShoppingListActions } from '../context/ShoppingListContext';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { NotFoundPage } from './NotFoundPage';

export function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const recipeId = Number(id);

  const { data: recipe, loading, error, reload } = useFetch<Recipe>(
    (signal) => getRecipeById(recipeId, signal),
    [recipeId]
  );

  const entries = useShoppingListState();
  const { addRecipe } = useShoppingListActions();

  const isAlreadyInList = entries.some((item) => item.recipeId === recipeId);

  if (loading) return <Loader />;
  if (error) {
    if (error.status === 404) return <NotFoundPage isRecipeNotFound />;
    return <ErrorMessage message="Erreur lors du chargement de la recette" onRetry={reload} />;
  }
  if (!recipe) return null;

  return (
    <article className="recipe-detail">
      <Link to="/" className="back-link">← Retour au catalogue</Link>
      
      <img src={recipe.image} alt={recipe.name} className="recipe-detail-img" />
      <h1>{recipe.name}</h1>
      
      <div className="recipe-meta-info">
        <span>★ {recipe.rating} ({recipe.reviewCount} avis)</span>
        <span>Prép. {recipe.prepTimeMinutes} min</span>
        <span>Cuisson {recipe.cookTimeMinutes} min</span>
        <span>{recipe.servings} portions</span>
        <span className="badge-tag">{recipe.difficulty}</span>
      </div>

      <button
        type="button"
        disabled={isAlreadyInList}
        onClick={() => addRecipe(recipe)}
        className="btn-add-cart"
      >
        {isAlreadyInList ? 'Déjà dans ma liste' : '+ Ajouter à ma liste de courses'}
      </button>

      <section className="recipe-section">
        <h2>Ingrédients</h2>
        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}