import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from './AppShell';
import { DashboardPage } from './DashboardPage';
import { OrdersPage, ReportsPage, SettingsPage } from './PlaceholderPages';
import { ProductListPage } from '../features/product/presentation/ProductListPage';
import { CreateProductPage } from '../features/product/presentation/CreateProductPage';
import { EditProductPage } from '../features/product/presentation/EditProductPage';
import { CustomerListPage, CreateCustomerPage, EditCustomerPage } from '../features/customer';

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/products',
        element: <ProductListPage />,
      },
      {
        path: '/customers',
        element: <CustomerListPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
  // Full-screen pages outside the shell (own header + back button)
  {
    path: '/products/new',
    element: <CreateProductPage />,
  },
  {
    path: '/products/:id/edit',
    element: <EditProductPage />,
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
