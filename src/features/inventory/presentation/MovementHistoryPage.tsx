import React from 'react';
import { useNavigate } from 'react-router-dom';

// Note: In Hanu architecture, usually global history is useful, but the product-specific history is more common.
// This is a placeholder for global movement history if needed in the future,
// per "MovementHistoryPage" requirement in the plan.
export const MovementHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white/80 px-4 py-3 backdrop-blur-xl border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => navigate('/inventory')}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 truncate">Global History</h1>
      </div>
      <div className="p-4 flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500">Global movement history is coming soon.</p>
        <p className="text-sm text-gray-400 mt-2">
          Please view history inside specific products for now.
        </p>
      </div>
    </div>
  );
};
