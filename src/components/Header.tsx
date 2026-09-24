import { NavLink, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useShoppingListCount } from '../context/ShoppingListContext';

export function Header() {
  const { user, logout } = useAuth();
  const count = useShoppingListCount();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="brand-logo">MIJOTÉ</Link>

        <nav className="header-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Catalogue
          </NavLink>
          
          <NavLink to="/proposer" className={({ isActive }) => (isActive ? 'active' : '')}>
            Proposer une recette
          </NavLink>

          <NavLink to="/courses" className="cart-badge-link">
            Courses <span className="badge">{count}</span>
          </NavLink>

          {user ? (
            <div className="user-info">
              <img src={user.image} alt={`Avatar de ${user.firstName}`} className="user-avatar" />
              <span className="desktop-only">{user.firstName}</span>
              <button type="button" onClick={logout} className="btn-logout">
                Se déconnecter
              </button>
            </div>
          ) : (
            <Link to="/connexion" className="btn-login">
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}