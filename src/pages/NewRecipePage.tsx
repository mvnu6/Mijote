import { useState, FormEvent } from 'react';
import { validateNewRecipe, NewRecipeFormValues } from '../utils/validation';
import { createRecipe } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function NewRecipePage() {
  const { user } = useAuth();
  const [values, setValues] = useState<NewRecipeFormValues>({
    name: '',
    cuisine: '',
    difficulty: 'Easy',
    prepTimeMinutes: 20,
    servings: 4,
    ingredientsText: '',
    instructionsText: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const errors = validateNewRecipe(values);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || !user) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const payload = {
      name: values.name.trim(),
      cuisine: values.cuisine.trim(),
      difficulty: values.difficulty,
      prepTimeMinutes: values.prepTimeMinutes,
      servings: values.servings,
      ingredients: values.ingredientsText.split('\n').map((l) => l.trim()).filter(Boolean),
      instructions: values.instructionsText.split('\n').map((l) => l.trim()).filter(Boolean),
      userId: user.id,
    };

    try {
      const res = await createRecipe(payload);
      setStatusMessage({
        type: 'success',
        text: `Recette proposée avec succès ! (ID : ${res.id})`,
      });
      setValues({
        name: '',
        cuisine: '',
        difficulty: 'Easy',
        prepTimeMinutes: 20,
        servings: 4,
        ingredientsText: '',
        instructionsText: '',
      });
      setTouched({});
    } catch {
      setStatusMessage({
        type: 'error',
        text: "Échec de l'envoi. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-recipe-page">
      <h1>Proposer une recette</h1>

      {statusMessage && (
        <div className={`status-banner ${statusMessage.type}`}>{statusMessage.text}</div>
      )}

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="name">Nom de la recette *</label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            onBlur={() => handleBlur('name')}
            aria-invalid={!!(touched.name && errors.name)}
            aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && <span id="name-error" className="field-error">⚠️ {errors.name}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine *</label>
            <input
              id="cuisine"
              type="text"
              value={values.cuisine}
              onChange={(e) => setValues({ ...values, cuisine: e.target.value })}
              onBlur={() => handleBlur('cuisine')}
              aria-invalid={!!(touched.cuisine && errors.cuisine)}
            />
            {touched.cuisine && errors.cuisine && <span className="field-error">⚠️ {errors.cuisine}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulté *</label>
            <select
              id="difficulty"
              value={values.difficulty}
              onChange={(e) => setValues({ ...values, difficulty: e.target.value as any })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="prepTimeMinutes">Préparation (min) *</label>
            <input
              id="prepTimeMinutes"
              type="number"
              value={values.prepTimeMinutes}
              onChange={(e) => setValues({ ...values, prepTimeMinutes: Number(e.target.value) })}
              onBlur={() => handleBlur('prepTimeMinutes')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="servings">Portions *</label>
            <input
              id="servings"
              type="number"
              value={values.servings}
              onChange={(e) => setValues({ ...values, servings: Number(e.target.value) })}
              onBlur={() => handleBlur('servings')}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="ingredientsText">Ingrédients * (un par ligne)</label>
          <textarea
            id="ingredientsText"
            rows={4}
            value={values.ingredientsText}
            onChange={(e) => setValues({ ...values, ingredientsText: e.target.value })}
            onBlur={() => handleBlur('ingredientsText')}
          />
          {touched.ingredientsText && errors.ingredientsText && <span className="field-error">⚠️ {errors.ingredientsText}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="instructionsText">Étapes * (une par ligne)</label>
          <textarea
            id="instructionsText"
            rows={4}
            value={values.instructionsText}
            onChange={(e) => setValues({ ...values, instructionsText: e.target.value })}
            onBlur={() => handleBlur('instructionsText')}
          />
          {touched.instructionsText && errors.instructionsText && <span className="field-error">⚠️ {errors.instructionsText}</span>}
        </div>

        <button type="submit" disabled={!isValid || isSubmitting} className="btn-submit">
          {isSubmitting ? 'Envoi...' : 'Envoyer la recette'}
        </button>
      </form>
    </div>
  );
}