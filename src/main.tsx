import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/AppRouter';
import './index.css'; // styles Tailwind
import { attachTokenToAxios } from './utils/auth/token';

attachTokenToAxios();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <AppRouter />
    </div>
  </React.StrictMode>,
);