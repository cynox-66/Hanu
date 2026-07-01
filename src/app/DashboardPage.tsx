import React from 'react';
import { Link } from 'react-router-dom';

const QUICK_ACTIONS = [
  {
    icon: '🧾',
    label: '+ New Sale',
    href: '/orders/new',
    id: 'dashboard-new-sale',
    color: 'bg-indigo-600',
  },
  {
    icon: '📦',
    label: '+ Product',
    href: '/products/new',
    id: 'dashboard-add-product',
    color: 'bg-gray-900',
  },
  {
    icon: '👤',
    label: '+ Customer',
    href: '/customers/new',
    id: 'dashboard-add-customer',
    color: 'bg-gray-900',
  },
];

const MODULE_CARDS = [
  {
    icon: '📦',
    label: 'Products',
    description: 'View and manage your products',
    href: '/products',
    id: 'dashboard-products',
  },
  {
    icon: '🧾',
    label: 'Sales',
    description: 'Track your sales and deliveries',
    href: '/orders',
    id: 'dashboard-sales',
  },
  {
    icon: '👤',
    label: 'Customers',
    description: 'Your buyers and their history',
    href: '/customers',
    id: 'dashboard-customers',
  },
  {
    icon: '📊',
    label: 'Stock',
    description: 'Check how healthy your stock is',
    href: '/inventory',
    id: 'dashboard-stock',
  },
];

export const DashboardPage: React.FC = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-gray-50 pb-8">
      {/* Greeting Header */}
      <div className="bg-white px-5 py-5 border-b border-gray-100">
        <p className="text-sm text-gray-400 font-medium">{greeting} 👋</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-0.5">Your Business</h2>
      </div>

      <div className="flex flex-col gap-6 px-4 pt-6">
        {/* Primary Quick Action */}
        <Link
          to="/orders/new"
          id="dashboard-primary-cta"
          className="flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 text-white shadow-md active:scale-[0.98] transition-transform duration-150"
        >
          <span className="text-2xl">🧾</span>
          <span className="text-lg font-bold">New Sale</span>
        </Link>

        {/* Quick Actions Row */}
        <section aria-labelledby="quick-actions-heading">
          <h2
            id="quick-actions-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Quick Actions
          </h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 snap-x">
            {QUICK_ACTIONS.slice(1).map((action) => (
              <Link
                key={action.id}
                to={action.href}
                id={action.id}
                className="flex shrink-0 snap-start items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm border border-gray-100 text-sm font-semibold text-gray-800 active:scale-[0.97] transition-transform duration-150 whitespace-nowrap"
              >
                <span className="text-lg">{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section aria-labelledby="modules-heading">
          <h2
            id="modules-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Your Business
          </h2>
          <ul className="grid grid-cols-2 gap-3">
            {MODULE_CARDS.map((card) => (
              <li key={card.id}>
                <Link
                  to={card.href}
                  id={card.id}
                  className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform duration-150 h-full"
                >
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{card.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-tight">{card.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
