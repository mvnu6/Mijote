import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ShoppingListEntry, Recipe } from '../types';

type Action =
  | { type: 'ADD_RECIPE'; payload: Recipe }
  | { type: 'TOGGLE_ITEM'; payload: { recipeId: number; itemIndex: number } }
  | { type: 'REMOVE_RECIPE'; payload: number }
  | { type: 'CLEAR' };

function shoppingReducer(state: ShoppingListEntry[], action: Action): ShoppingListEntry[] {
  switch (action.type) {
    case 'ADD_RECIPE': {
      if (state.some((e) => e.recipeId === action.payload.id)) return state;
      const newEntry: ShoppingListEntry = {
        recipeId: action.payload.id,
        recipeName: action.payload.name,
        items: action.payload.ingredients.map((ing) => ({ label: ing, checked: false })),
      };
      return [...state, newEntry];
    }
    case 'TOGGLE_ITEM': {
      return state.map((entry) => {
        if (entry.recipeId !== action.payload.recipeId) return entry;
        const newItems = entry.items.map((item, idx) =>
          idx === action.payload.itemIndex ? { ...item, checked: !item.checked } : item
        );
        return { ...entry, items: newItems };
      });
    }
    case 'REMOVE_RECIPE':
      return state.filter((e) => e.recipeId !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const ShoppingStateContext = createContext<ShoppingListEntry[] | null>(null);
const ShoppingActionsContext = createContext<{
  addRecipe: (recipe: Recipe) => void;
  toggleItem: (recipeId: number, itemIndex: number) => void;
  removeRecipe: (recipeId: number) => void;
  clearList: () => void;
} | null>(null);

export function ShoppingListProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(shoppingReducer, [], () => {
    try {
      const localData = localStorage.getItem('mijote_shopping_list');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mijote_shopping_list', JSON.stringify(state));
  }, [state]);

  const addRecipe = (recipe: Recipe) => dispatch({ type: 'ADD_RECIPE', payload: recipe });
  const toggleItem = (recipeId: number, itemIndex: number) =>
    dispatch({ type: 'TOGGLE_ITEM', payload: { recipeId, itemIndex } });
  const removeRecipe = (recipeId: number) => dispatch({ type: 'REMOVE_RECIPE', payload: recipeId });
  const clearList = () => dispatch({ type: 'CLEAR' });

  return (
    <ShoppingStateContext.Provider value={state}>
      <ShoppingActionsContext.Provider value={{ addRecipe, toggleItem, removeRecipe, clearList }}>
        {children}
      </ShoppingActionsContext.Provider>
    </ShoppingStateContext.Provider>
  );
}

export function useShoppingListState() {
  const ctx = useContext(ShoppingStateContext);
  if (!ctx) throw new Error('useShoppingListState doit être dans ShoppingListProvider');
  return ctx;
}

export function useShoppingListActions() {
  const ctx = useContext(ShoppingActionsContext);
  if (!ctx) throw new Error('useShoppingListActions doit être dans ShoppingListProvider');
  return ctx;
}

export function useShoppingListCount() {
  const state = useShoppingListState();
  return state.length;
}