import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { CreateProductPage } from '../features/product/presentation/CreateProductPage';
import { EditProductPage } from '../features/product/presentation/EditProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products/new',
    element: <CreateProductPage />,
  },
  {
    path: '/products/:id/edit',
    element: <EditProductPage />,
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
