import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/auth/axiosInstance';
import { setToken } from '../utils/auth/token';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 10;
  const passwordsMatch = password === repeatPassword;
  const isFormValid = isEmailValid && isPasswordValid && passwordsMatch && termsAccepted;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
        confirmPassword: repeatPassword
      });
      const token = response.data?.access_token;
      if (token) {
        setToken(token);
        navigate('/'); 
      }
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-sm p-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`shadow-xs bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${!isEmailValid && email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-blue-500 focus:border-blue-500`}
              placeholder="name@flowbite.com"
            />
            {!isEmailValid && email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">Adresse email invalide.</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`shadow-xs bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${!isPasswordValid && password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {!isPasswordValid && password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">Le mot de passe doit contenir au moins 10 caractères.</p>
            )}
          </div>
          <div>
            <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme mot de passe</label>
            <input
              type="password"
              id="repeat-password"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              className={`shadow-xs bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white ${!passwordsMatch && repeatPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {!passwordsMatch && repeatPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">Les mots de passe ne correspondent pas.</p>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600" />
            </div>
            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              J'accepte les <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">conditions d'utilisation</a>
            </label>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/login" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
              Déjà un compte ?
            </Link>
            <button
              type="submit"
              disabled={!isFormValid}
              className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Créer un compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}