import { useState, useEffect } from "react";
import { searchRecipes, getRecipeById } from "./services/api";
import { Recipe } from "./types";



function App() {
  const [recipes, setRecipes] = useState <Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  getRecipeById(1)
    .then((recipe) => {
      console.log('Recette #1 récupérée :', recipe);
    })
    .catch((err) => {
      console.error('Erreur getRecipeById :', err);
    });
}, []);

if (loading) return <p>Chargement et test de l'API en cours...</p>;
if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <div>
        
        <h1>Test de l'API DummyJSON (MIJOTÉ)</h1>
        <p>
          Nombre de recettes récupérées : <strong>{recipes.length}</strong>
        </p>
        <h3>Aperçu des 5 premières recettes :</h3>
        <ul>
          
          {recipes.slice(0, 5).map((Recipe) => (
            <li>
              
              <strong>{Recipe.name}</strong> ({Recipe.cuisine} 
              {Recipe.difficulty})
            </li>
          ))}
        </ul>
        <p>
          <em>
            Regarde la console de ton navigateur (F12) pour voir les objets
            complets !
          </em>
        </p>
      </div>
    </>
  );
}

export default App;
