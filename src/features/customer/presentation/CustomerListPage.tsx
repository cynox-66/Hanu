import React from 'react';
import { CustomerList } from './CustomerList';

export const CustomerListPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 pb-3 pt-safe-top shadow-sm">
        <div className="flex items-center justify-between pt-3">
          <h1 className="text-xl font-bold text-gray-900">Customers</h1>
          <span className="text-sm text-gray-400">Directory</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-safe-bottom" id="customer-list-main">
        <CustomerList />
      </main>
    </div>
  );
};
