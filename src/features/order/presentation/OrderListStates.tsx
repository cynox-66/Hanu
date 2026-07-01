import React from 'react';

export const OrderListSkeleton: React.FC = () => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading orders">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
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

export const OrderListEmpty: React.FC = () => (
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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-gray-900">No orders yet</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      You haven&apos;t received any orders yet. Create your first order to track sales.
    </p>
  </div>
);

export const OrderListError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
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
    <h2 className="text-lg font-semibold text-gray-900">Couldn&apos;t load orders</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      Your data is safe. Check your storage and try again.
    </p>
    <button
      onClick={onRetry}
      className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white active:scale-95 transition-transform duration-150"
    >
      Try Again
    </button>
  </div>
);

export const OrderListNoSearchResults: React.FC<{ searchQuery: string; onClear: () => void }> = ({
  searchQuery,
  onClear,
}) => (
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
    <h2 className="text-lg font-semibold text-gray-900">No matching orders</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      We couldn&apos;t find any orders matching &quot;{searchQuery}&quot;.
    </p>
    <button
      onClick={onClear}
      className="mt-6 font-medium text-gray-900 underline active:text-gray-700 transition-colors"
    >
      Clear search
    </button>
  </div>
);
