import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { PrivateRoute } from './components/layout/PrivateRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { CategoryPage } from './pages/CategoryPage';
import { DiscountPage } from './pages/DiscountPage';
import { DataPage } from './pages/DataPage';
import { useAuth } from './hooks/useAuth';
import { useFavoritesStore } from './store/favoritesStore';
import { LoadingScreen } from './components/ui/LoadingScreen';

const App: React.FC = () => {
  const { initialized, user } = useAuth();
  const { loadFavorites } = useFavoritesStore();

  // Charger les favoris au démarrage si l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user, loadFavorites]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/discount"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DiscountPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <CategoryPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/data"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DataPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;