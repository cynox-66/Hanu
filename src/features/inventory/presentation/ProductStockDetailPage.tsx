import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovementHistory, useInventorySummary, useMovementSearch } from '../hooks';
import { useProduct } from '../../product/hooks';
import { MovementRow } from './components/MovementRow';
import { MovementLoading, MovementError, MovementEmpty } from './MovementListStates';
import { createEmptyInventorySummary } from '../domain/InventoryFactory';
import { getInventoryAlertStatus, getInventoryAlertBadge } from '../domain/InventoryAlerts';
import { formatCurrency } from '../../../shared/utils/currency';

export const ProductStockDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    throw new Error('Product ID is required');
  }

  const { product, isLoading: productLoading, error: productError } = useProduct(id);
  const { summary, isLoading: summaryLoading, error: summaryError } = useInventorySummary(id);
  const {
    movements,
    isLoading: movementsLoading,
    error: movementsError,
    refetch: refetchMovements,
  } = useMovementHistory(id);

  const { filters, setFilters, filteredMovements } = useMovementSearch(movements);

  const isLoading = productLoading || summaryLoading || movementsLoading;
  const error = productError || summaryError || movementsError;

  const handleRetry = () => {
    refetchMovements();
  };

  const actualSummary = summary || createEmptyInventorySummary(id);
  const alertStatus = getInventoryAlertStatus(
    actualSummary.currentStock,
    product?.lowStockThreshold,
  );
  const stockStatus = getInventoryAlertBadge(alertStatus);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-safe">
      <div className="sticky top-0 z-10 bg-white/80 px-4 py-3 backdrop-blur-xl border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => navigate('/inventory')}
          className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
        >
          ←
        </button>
        <h1 className="text-xl font-bold tracking-tight text-gray-900 truncate">
          {product?.name || 'Stock Details'}
        </h1>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-6">
        {isLoading ? (
          <MovementLoading />
        ) : error ? (
          <MovementError error={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* Summary Card */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-700">Inventory Status</span>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${stockStatus.color}`}
                >
                  {stockStatus.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Current Stock</p>
                  <p className="text-3xl font-bold text-gray-900">{actualSummary.currentStock}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Value</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(actualSummary.totalCostValue)}
                  </p>
                </div>
              </div>
            </section>

            {/* Movement History */}
            <section className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Stock History</h2>
                <button
                  onClick={() => navigate(`/products/${id}`)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  + Add Stock
                </button>
              </div>

              {/* Simple filter example - could be expanded */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <button
                  onClick={() => setFilters({})}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!filters.type ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilters({ type: 'stock_in' })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filters.type === 'stock_in' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Added
                </button>
                <button
                  onClick={() => setFilters({ type: 'stock_out' })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filters.type === 'stock_out' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Removed
                </button>
                <button
                  onClick={() => setFilters({ type: 'adjustment' })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filters.type === 'adjustment' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Corrections
                </button>
              </div>

              {filteredMovements.length === 0 ? (
                <MovementEmpty />
              ) : (
                <div className="flex flex-col">
                  {filteredMovements.map((movement) => (
                    <MovementRow key={movement.id} movement={movement} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};
