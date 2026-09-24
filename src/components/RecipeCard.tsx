import React from 'react';
import { Link } from 'react-router';
import { Recipe } from '../types';

export const RecipeCard = React.memo(function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <Link to={`/recettes/${recipe.id}`} className="recipe-card">
      <img src={recipe.image} alt={recipe.name} className="recipe-card-img" />
      <div className="recipe-card-content">
        <h3>{recipe.name}</h3>
        <div className="recipe-card-meta">
          <span>★ {recipe.rating}</span>
          <span>⏱️ {totalTime} min</span>
          <span className="badge-tag">{recipe.difficulty}</span>
          <span className="badge-tag">{recipe.cuisine}</span>
        </div>
      </div>
    </Link>
  );
});