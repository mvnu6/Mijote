import { Link } from 'react-router';
import { useShoppingListState, useShoppingListActions } from '../context/ShoppingListContext';

export function ShoppingListPage() {
  const entries = useShoppingListState();
  const { toggleItem, removeRecipe, clearList } = useShoppingListActions();

  const totalRecipes = entries.length;
  const allItems = entries.flatMap((e) => e.items);
  const checkedItemsCount = allItems.filter((i) => i.checked).length;
  const totalItemsCount = allItems.length;

  if (totalRecipes === 0) {
    return (
      <div className="shopping-list-empty">
        <h2>Ma liste de courses</h2>
        <p>Votre liste de courses est actuellement vide.</p>
        <Link to="/" className="btn-primary">Découvrir le catalogue</Link>
      </div>
    );
  }

  return (
    <div className="shopping-list-page">
      <h1>Ma liste de courses</h1>
      <p className="summary-text">
        {totalRecipes} recette{totalRecipes > 1 ? 's' : ''} · {checkedItemsCount} articles cochés sur {totalItemsCount}
      </p>

      {entries.map((entry) => (
        <div key={entry.recipeId} className="shopping-group">
          <div className="group-header">
            <h2>{entry.recipeName}</h2>
            <button
              type="button"
              onClick={() => removeRecipe(entry.recipeId)}
              className="btn-remove"
            >
              Retirer
            </button>
          </div>

          <ul className="checklist">
            {entry.items.map((item, index) => (
              <li key={index} className={item.checked ? 'checked' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(entry.recipeId, index)}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button type="button" onClick={clearList} className="btn-clear-all">
        Vider la liste
      </button>
    </div>
  );
}