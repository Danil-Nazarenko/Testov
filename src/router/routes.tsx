import { createRootRoute, createRoute, Router } from '@tanstack/react-router';
import Layout from '../components/layout';
import HomePage from '../pages/HomePage';
import ChartPage from '../pages/ChartPage';
import TreePage from '../pages/TreePage';
import CreateFolderPage from '../pages/CreateFolderPage';

// Создаем корневой маршрут, который будет использовать Layout
const rootRoute = createRootRoute({
  component: Layout, // Layout для всех страниц
});

// Дочерние маршруты для каждой страницы
const homeRoute = createRoute({
  getParentRoute: () => rootRoute, // Родительский маршрут — корень
  path: '/',
  component: HomePage,
});

const chartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chart',
  component: ChartPage,
});

const treeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tree',
  component: TreePage,
});

const createFolderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-folder',
  component: CreateFolderPage,
});

// Добавляем дочерние маршруты к корневому маршруту
export const routeTree = rootRoute.addChildren([
  homeRoute,
  chartRoute,
  treeRoute,
  createFolderRoute,
]);

// Создаем сам роутер
export const router = new Router({ routeTree });
