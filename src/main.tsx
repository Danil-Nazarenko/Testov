import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router'; // Импортируем RouterProvider
import { router } from './router/routes'; // Импортируем созданный роутер
import './styles/global.css'; // Подключение глобальных стилей

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Оборачиваем приложение в RouterProvider */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
