import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, ShoppingBag, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AuthFormProps } from '../../types/auth';

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin: defaultIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const getErrorMessage = (error: string | null) => {
    if (!error) return null;
    if (error.includes('auth/invalid-credential') || error.includes('auth/wrong-password')) {
      return 'Email ou mot de passe incorrect';
    }
    if (error.includes('auth/user-not-found')) {
      return 'Aucun compte ne correspond à cet email';
    }
    if (error.includes('auth/email-already-in-use')) {
      return 'Un compte existe déjà avec cet email';
    }
    if (error.includes('auth/weak-password')) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (error.includes('auth/invalid-email')) {
      return 'Adresse email invalide';
    }
    return 'Une erreur est survenue';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et Titre */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 mb-8 transform hover:scale-105 transition-all duration-200">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Fringue Express
          </h1>
          <p className="text-lg text-gray-400 text-center">
            Analyseur de prix intelligent
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-center mb-3">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-gray-700/50 border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-base"
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 text-center mb-3">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-gray-700/50 border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-base"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400 text-center">{getErrorMessage(error)}</p>
              </div>
            )}

            {/* Bouton de soumission */}
            <Button
              type="submit"
              loading={loading}
              icon={isLogin ? LogIn : UserPlus}
              className="w-full h-14 text-base rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200"
            >
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>

            {/* Lien de basculement */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isLogin ? (
                  <>
                    Pas encore de compte ?{' '}
                    <span className="font-medium">S'inscrire</span>
                  </>
                ) : (
                  <>
                    Déjà un compte ?{' '}
                    <span className="font-medium">Se connecter</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};