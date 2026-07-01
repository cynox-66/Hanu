export interface NavItem {
  label: string;
  icon: string;
  href: string;
  enabled: boolean;
  description: string;
}

/**
 * Canonical navigation configuration for HANU.
 *
 * To add a new module in a future sprint:
 *   1. Add an entry here with `enabled: true`.
 *   2. Register the route in router.tsx.
 *   3. Replace the placeholder page with the real implementation.
 *
 * No changes to AppShell, DashboardPage, or any other file are required.
 *
 * UI Language Rule: Use business terms only.
 *   ✓ Products, Sales, Customers, Stock
 *   ✗ Orders, Inventory Ledger, Movements
 */
export const navigation: NavItem[] = [
  {
    label: 'Home',
    icon: '🏠',
    href: '/',
    enabled: true,
    description: 'Dashboard',
  },
  {
    label: 'Products',
    icon: '📦',
    href: '/products',
    enabled: true,
    description: 'What you sell',
  },
  {
    label: 'Sales',
    icon: '🧾',
    href: '/orders',
    enabled: true,
    description: 'Your sales',
  },
  {
    label: 'Customers',
    icon: '👤',
    href: '/customers',
    enabled: true,
    description: 'Your buyers',
  },
  {
    label: 'Stock',
    icon: '📊',
    href: '/inventory',
    enabled: true,
    description: 'Stock health',
  },
];
