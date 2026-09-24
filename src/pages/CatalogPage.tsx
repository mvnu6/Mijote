import { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { searchRecipes } from '../services/api';
import { RecipeSearchResponse, Meal } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState } from '../components/EmptyState';

export function CatalogPage() {
  const [query, setQuery] = useState('');
  const [mealType, setMealType] = useState<Meal | ''>('');
  const [sortBy, setSortBy] = useState<string>('default');

  const debouncedQuery = useDebounce(query, 400);

  const { data, loading, error, reload } = useFetch<RecipeSearchResponse>(
    (signal) => searchRecipes(debouncedQuery, signal),
    [debouncedQuery]
  );

const filteredAndSortedRecipes = useMemo(() => {
  if (!data?.recipes) return [];
  
  let result = [...data.recipes];

  // Filtre par type de repas sécurisé
  if (mealType) {
    result = result.filter((recipe) =>
      Array.isArray(recipe.Meal) &&
      recipe.Meal.some(
        (mt) => mt && mt.toLowerCase() === mealType.toLowerCase()
      )
    );
  }


  if (sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'time') {
    result.sort(
      (a, b) => (a.prepTimeMinutes + a.cookTimeMinutes) - (b.prepTimeMinutes + b.cookTimeMinutes)
    );
  } else if (sortBy === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}, [data, mealType, sortBy]);

  return (
    <div className="catalog-page">
      <div className="search-filters">
        <input
          type="search"
          placeholder="Rechercher une recette..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <div className="filters-row">
          <select value={mealType} onChange={(e) => setMealType(e.target.value as Meal | '')}>
            <option value="">Tous les repas</option>
            <option value="Petit-déjeuner">Breakfast</option>
            <option value="Déjeuner">Lunch</option>
            <option value="Dîner">Dinner</option>
            <option value="Entrée">Appetizer</option>
            <option value="dessert">Dessert</option>
            <option value="Boisson">Beverage</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Pertinence</option>
            <option value="rating">Note décroissante</option>
            <option value="time">Temps total croissant</option>
            <option value="name">Nom de A à Z</option>
          </select>
        </div>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message="Impossible de charger le catalogue" onRetry={reload} />}

      {!loading && !error && (
        <>
          <p className="results-count">{filteredAndSortedRecipes.length} recettes</p>
          {filteredAndSortedRecipes.length === 0 ? (
            <EmptyState message="Aucune recette trouvée" />
          ) : (
            <div className="recipe-grid">
              {filteredAndSortedRecipes.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}