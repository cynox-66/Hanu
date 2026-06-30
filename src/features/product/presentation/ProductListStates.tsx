import React from 'react';

export const ProductListSkeleton: React.FC = () => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading products">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm"
      >
        <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 animate-pulse" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="h-4 w-14 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-10 rounded-full bg-gray-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export const ProductListEmpty: React.FC = () => (
  <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <svg
        className="h-10 w-10 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-gray-900">No products yet</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      Your product catalog is empty. Add your first product to get started.
    </p>
  </div>
);

export const ProductListError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
      <svg
        className="h-10 w-10 text-red-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-gray-900">Couldn't load products</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      Your data is safe. Check your storage and try again.
    </p>
    <button
      id="retry-load-products"
      onClick={onRetry}
      className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white active:scale-95 transition-transform duration-150"
    >
      Try Again
    </button>
  </div>
);

export const ProductListNoSearchResults: React.FC<{ searchQuery: string; onClear: () => void }> = ({ searchQuery, onClear }) => (
  <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
      <svg
        className="h-10 w-10 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-gray-900">No matching products</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      We couldn't find any products matching "{searchQuery}".
    </p>
    <button
      onClick={onClear}
      className="mt-6 font-medium text-gray-900 underline active:text-gray-700 transition-colors"
    >
      Clear search
    </button>
  </div>
);
