import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      await login({ username, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      if (err?.status === 400) {
        setErrorMessage('Identifiants incorrects.');
      } else {
        setErrorMessage('Erreur réseau. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <p>Connectez-vous pour proposer une recette</p>

      {errorMessage && <div className="error-banner">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Nom d'utilisateur
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
      <p className="test-credentials">Compte de test : emilys / emilyspass</p>
    </div>
  );
}