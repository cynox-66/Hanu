import React from 'react';
import { ModuleCard } from './components/ModuleCard';
import { QuickActionCard } from './components/QuickActionCard';
import { navigation } from './navigation';

const QUICK_ACTIONS = [
  { icon: '📦', label: '+ Product', href: '/products/new', id: 'dashboard-add-product' },
  { icon: '👥', label: '+ Customer', href: '/customers/new', id: 'dashboard-add-customer' },
  { icon: '📄', label: '+ Order', href: '/orders/new', id: 'dashboard-add-order' },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-gray-50 px-4 py-6">
      {/* Quick Actions */}
      <section aria-labelledby="quick-actions-heading">
        <h2
          id="quick-actions-heading"
          className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400"
        >
          Quick Actions
        </h2>
        <div className="flex gap-3">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard
              key={action.id}
              icon={action.icon}
              label={action.label}
              href={action.href}
              id={action.id}
            />
          ))}
        </div>
      </section>

      {/* Modules — driven by navigation.ts */}
      <section aria-labelledby="modules-heading" className="mt-8">
        <h2
          id="modules-heading"
          className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400"
        >
          Modules
        </h2>
        <ul className="flex flex-col gap-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <ModuleCard
                icon={item.icon}
                label={item.label}
                description={item.description}
                href={item.href}
                enabled={item.enabled}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
