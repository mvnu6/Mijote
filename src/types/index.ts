
import { BASE_URL, ApiError } from "../services/api";

//tri par type de rapas
export type Meal =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "appetizer"
  | "dessert"
  | "beverage";
//tri par difficulté
export type Difficulty = "Easy" | "Medium" | "Hard";

// Modèle d'une recette retournée par DummyJSON
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  Meal: string[];
}

// Réponse typée de l'endpoint /recipes/search
export interface RecipeSearchResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

// Identifiants pour la connexion
export interface LoginCredentials {
  username: string;
  password: string;
}

// Données reçues après authentification réussie
export interface AuthUser {
  id: number;
  username: string;
  firstName: string;
  image: string;
  accessToken: string;
}

// Charge utile envoyée à POST /recipes/add
export interface NewRecipe {
  name: string;
  cuisine: string;
  difficulty: Difficulty;
  prepTimeMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  userId: number;
}

// Article individuel dans la liste de courses
export interface ShoppingListItem {
  label: string;
  checked: boolean;
}

// Entrée de liste de courses regroupée par recette
export interface ShoppingListEntry {
  recipeId: number;
  recipeName: string;
  items: ShoppingListItem[];
}export async function getRecipeById(
    id: number | string,
    signal?: AbortSignal
): Promise<Recipe> {
    const response = await fetch(`${BASE_URL}/recipes/${id}`, { signal });
    if (!response.ok) {
        throw new ApiError("Recette introuvable", response.status);
    }
    return response.json();
}

