import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { CreateProductPage } from '../features/product/presentation/CreateProductPage';
import { EditProductPage } from '../features/product/presentation/EditProductPage';
import { CustomerListPage, CreateCustomerPage, EditCustomerPage } from '../features/customer';

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
  },
  {
    path: '/customers',
    element: <CustomerListPage />,
  },
  {
    path: '/customers/new',
    element: <CreateCustomerPage />,
  },
  {
    path: '/customers/:id/edit',
    element: <EditCustomerPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
