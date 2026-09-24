import { NewRecipe } from '../types';

export type NewRecipeFormValues = Omit<NewRecipe, 'ingredients' | 'instructions' | 'userId'> & {
  ingredientsText: string;
  instructionsText: string;
};

export function validateNewRecipe(values: NewRecipeFormValues) {
  const errors: Partial<Record<keyof NewRecipeFormValues, string>> = {};

  const cleanName = values.name.trim();
  if (!cleanName || cleanName.length < 3 || cleanName.length > 60) {
    errors.name = 'Le nom doit contenir entre 3 et 60 caractères.';
  }

  if (!values.cuisine.trim()) {
    errors.cuisine = 'La cuisine est obligatoire.';
  }

  if (values.prepTimeMinutes < 1 || values.prepTimeMinutes > 240) {
    errors.prepTimeMinutes = 'Le temps de préparation doit être entre 1 et 240 minutes.';
  }

  if (values.servings < 1 || values.servings > 12) {
    errors.servings = 'Le nombre de portions doit être entre 1 et 12.';
  }

  const ingredientsList = values.ingredientsText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (ingredientsList.length < 2) {
    errors.ingredientsText = 'Indiquez au moins 2 ingrédients (un par ligne).';
  }

  const instructionsList = values.instructionsText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (instructionsList.length < 1) {
    errors.instructionsText = 'Indiquez au moins 1 étape de préparation.';
  }

  return errors;
}