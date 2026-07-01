import React from 'react';
import { OrderList } from './OrderList';

export const OrderListPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 pb-3 pt-safe-top shadow-sm">
        <div className="flex items-center justify-between pt-3">
          <h1 className="text-xl font-bold text-gray-900">Orders</h1>
          <span className="text-sm text-gray-400">Sales History</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-safe-bottom" id="order-list-main">
        <OrderList />
      </main>
    </div>
  );
};
