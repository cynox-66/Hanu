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
 */
export const navigation: NavItem[] = [
  {
    label: 'Products',
    icon: '📦',
    href: '/products',
    enabled: true,
    description: 'Manage your catalogue',
  },
  {
    label: 'Customers',
    icon: '👥',
    href: '/customers',
    enabled: true,
    description: 'Your customer directory',
  },
  {
    label: 'Orders',
    icon: '📄',
    href: '/orders',
    enabled: true,
    description: 'Track your orders',
  },
  {
    label: 'Reports',
    icon: '📈',
    href: '/reports',
    enabled: false,
    description: 'Business insights',
  },
  {
    label: 'Settings',
    icon: '⚙',
    href: '/settings',
    enabled: false,
    description: 'App preferences',
  },
];
