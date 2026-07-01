import React from 'react';
import { Link } from 'react-router-dom';
import { OrderList } from './OrderList';

export const OrderListPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white px-4 pb-3 pt-safe-top shadow-sm">
        <div className="flex items-center justify-between pt-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Sales</h1>
            <p className="text-xs text-gray-400 mt-0.5">Your sales history</p>
          </div>
          <Link
            to="/orders/new"
            id="sales-add-btn"
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm active:scale-95 transition-transform duration-150"
          >
            + New Sale
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4 pb-safe-bottom" id="order-list-main">
        <OrderList />
      </main>
    </div>
  );
};
