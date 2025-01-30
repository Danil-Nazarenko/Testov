import { RouterProvider } from '@tanstack/react-router';  // Подключаем RouterProvider
import { router } from './router/routes';  // Импортируем настроенный роутер

const App = () => {
  return (
    <RouterProvider router={router} />  // Передаем только роутер
  );
};

export default App;
