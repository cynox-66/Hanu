import React from 'react';

export const CustomerListSkeleton: React.FC = () => (
  <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading customers">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
        <div className="h-14 w-14 shrink-0 rounded-full bg-gray-100 animate-pulse" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-1/2 rounded bg-gray-100 animate-pulse" />
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="h-4 w-14 rounded bg-gray-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export const CustomerListEmpty: React.FC = () => (
  <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
      <svg
        className="h-10 w-10 text-blue-400"
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
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-gray-900">No customers yet</h2>
    <p className="mt-2 text-sm text-gray-900 max-w-xs font-medium">
      Customers help you keep track of purchases and relationships.
    </p>
    <p className="mt-1 text-sm text-gray-500 max-w-xs">
      You haven&apos;t added any customers yet. Add a customer or wait for their first purchase.
    </p>
    <a
      href="/customers/new"
      id="customers-empty-cta"
      className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white active:scale-95 transition-transform duration-150"
    >
      + Add Customer
    </a>
  </div>
);

export const CustomerListError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
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
    <h2 className="text-lg font-semibold text-gray-900">Couldn&apos;t load customers</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      Your data is safe. Check your storage and try again.
    </p>
    <button
      id="retry-load-customers"
      onClick={onRetry}
      className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white active:scale-95 transition-transform duration-150"
    >
      Try Again
    </button>
  </div>
);

export const CustomerListNoSearchResults: React.FC<{
  searchQuery: string;
  onClear: () => void;
}> = ({ searchQuery, onClear }) => (
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
    <h2 className="text-lg font-semibold text-gray-900">No matching customers</h2>
    <p className="mt-2 text-sm text-gray-500 max-w-xs">
      We couldn&apos;t find any customers matching &quot;{searchQuery}&quot;.
    </p>
    <button
      onClick={onClear}
      className="mt-6 font-medium text-gray-900 underline active:text-gray-700 transition-colors"
    >
      Clear search
    </button>
  </div>
);
