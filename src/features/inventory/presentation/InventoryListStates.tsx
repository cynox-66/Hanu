import React from 'react';

export const InventoryLoading: React.FC = () => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading stock">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start">
          <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
          <div className="h-6 w-10 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="mt-4 h-3 w-24 rounded bg-gray-100 animate-pulse" />
      </div>
    ))}
  </div>
);

export const InventoryError: React.FC<{ error: Error; onRetry?: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
      <span className="text-red-600 text-xl">!</span>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Couldn&apos;t load stock</h3>
    <p className="text-gray-500 mb-6 max-w-sm">
      Your data is safe. Please refresh the page if this persists.
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
      >
        Try Again
      </button>
    )}
  </div>
);

export const InventoryEmpty: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-3xl">
      📦
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No stock yet</h3>
    <p className="mt-2 text-sm text-gray-900 max-w-xs font-medium">
      The Inventory dashboard helps you track what to restock.
    </p>
    <p className="mt-1 text-sm text-gray-500 max-w-xs">
      Once you add products and stock, you&apos;ll see how healthy your business is here.
    </p>
    <a
      href="/products"
      className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white active:scale-95 transition-transform duration-150"
    >
      Go to Products
    </a>
  </div>
);
