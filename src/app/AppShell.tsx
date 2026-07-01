import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { navigation } from './navigation';

export const AppShell: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Global Header */}
      <header className="sticky top-0 z-20 bg-white px-4 pb-3 pt-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">HANU</h1>
            <p className="text-xs text-gray-400">Business OS</p>
          </div>
          <Link
            to="/"
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-200"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom Navigation — driven by navigation.ts */}
      <nav
        className="sticky bottom-0 z-20 flex items-center justify-around border-t border-gray-100 bg-white pb-safe-bottom"
        aria-label="Main navigation"
      >
        {navigation.map((item) => {
          if (!item.enabled) {
            return (
              <span
                key={item.href}
                className="flex flex-1 flex-col items-center gap-0.5 py-2 text-gray-300"
                aria-disabled="true"
                title="Coming soon"
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
              </span>
            );
          }

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors ${
                  isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
