import { Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { CatalogPage } from './pages/CatalogPage';
import { RecipePage } from './pages/RecipePage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { LoginPage } from './pages/LoginPage';
import { NewRecipePage } from './pages/NewRecipePage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CatalogPage />} />
            <Route path="recettes/:id" element={<RecipePage />} />
            <Route path="courses" element={<ShoppingListPage />} />
            <Route path="connexion" element={<LoginPage />} />
            <Route
              path="proposer"
              element={
                <ProtectedRoute>
                  <NewRecipePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ShoppingListProvider>
    </AuthProvider>
  );
}