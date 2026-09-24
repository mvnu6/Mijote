import {
  RecipeSearchResponse,
  LoginCredentials,
  AuthUser,
  NewRecipe,
  Recipe,
} from "../types";

export const BASE_URL = import.meta.env.VITE_API_URL;

// Classe d'erreur HTTP
export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function getRecipeById(id: number, signal?: AbortSignal): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipes/${id}`, { signal });
  if (!response.ok) {
    throw new ApiError("Recette introuvable", response.status);
  }
  return response.json();
}


//recherche de recette avec limit=0
export async function searchRecipes(
  query: string = "",
  signal?: AbortSignal,
): Promise<RecipeSearchResponse> {
  const url = `${BASE_URL}/recipes/search?q=${encodeURIComponent(query)}&limit=0`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new ApiError(
      "Erreur lors de la récupération des recettes",
      response.status,
    );
  }
  return response.json();
}

//connexion user
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new ApiError("Identifiants incorrects", response.status);
  }
  return response.json();
}

//Proposition / Création de recette
export async function createRecipe(payload: NewRecipe): Promise<Recipe> {
    const response = await fetch(`${BASE_URL}/recipes/add`,{
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(payload),
    });

    if (!response.ok){
        throw new ApiError("Échec de la création de la recette", response.status);
    }

    return response.json();
}
