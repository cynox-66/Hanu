import React from 'react';

export const MovementLoading: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-500 mb-4" />
    <p className="text-gray-400 text-sm">Loading history...</p>
  </div>
);

export const MovementError: React.FC<{ error: Error; onRetry: () => void }> = ({
  error,
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-50 rounded-2xl">
    <p className="text-red-600 text-sm mb-3">{error.message}</p>
    <button onClick={onRetry} className="text-sm font-semibold text-gray-900 underline">
      Try Again
    </button>
  </div>
);

export const MovementEmpty: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-2xl">
    <p className="text-gray-900 text-sm font-medium mb-1">
      Stock history tracks every time stock is added or removed.
    </p>
    <p className="text-gray-500 text-sm">No stock movements have been recorded yet.</p>
  </div>
);
