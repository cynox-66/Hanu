import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderBuilder } from './OrderBuilder';

export const CreateOrderPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 pb-3 pt-safe-top shadow-sm">
        <div className="flex items-center gap-3 pt-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900"
            aria-label="Go back"
          >
            <svg
              className="h-6 w-6 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-900">New Order</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-4" id="create-order-main">
        <OrderBuilder />
      </main>
    </div>
  );
};
