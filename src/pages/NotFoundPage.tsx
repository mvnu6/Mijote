import { Link } from 'react-router';

export function NotFoundPage({ isRecipeNotFound = false }: { isRecipeNotFound?: boolean }) {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>{isRecipeNotFound ? 'Recette introuvable pour un identifiant inconnu' : 'Cette page n’existe pas'}</p>
      <Link to="/" className="btn-primary">Retour au catalogue</Link>
    </div>
  );
}