import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { navigation } from './navigation';

export const AppShell: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav
        className="sticky bottom-0 z-20 flex items-center justify-around border-t border-gray-100 bg-white/90 backdrop-blur-lg pb-safe-bottom pt-2 px-2"
        aria-label="Main navigation"
      >
        {navigation.map((item) => {
          if (!item.enabled) return null;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-all"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{item.icon}</span>
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      isActive ? 'text-indigo-700' : 'text-gray-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
