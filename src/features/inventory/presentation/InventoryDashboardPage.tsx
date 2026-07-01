import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventorySummaries } from '../hooks';
import { useActiveProducts } from '../../product/hooks';
import { StockCard } from './components/StockCard';
import { AddStockSheet } from './components/AddStockSheet';
import { InventoryLoading, InventoryError, InventoryEmpty } from './InventoryListStates';
import { createEmptyInventorySummary } from '../domain/InventoryFactory';
import { getInventoryAlertStatus, InventoryAlertStatus } from '../domain/InventoryAlerts';
import { normalizeText } from '../../../shared/utils/normalizeText';

/** Represents which status filter is currently active. null = All. */
type ActiveFilter = InventoryAlertStatus | null;

export const InventoryDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { summaries, isLoading: summariesLoading, error: summariesError } = useInventorySummaries();
  const { products, isLoading: productsLoading, error: productsError } = useActiveProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(null);
  const [stockToAdd, setStockToAdd] = useState<{ id: string; name: string } | null>(null);

  const isLoading = summariesLoading || productsLoading;
  const error = summariesError || productsError;

  /** All products enriched with their live inventory summary. */
  const allEnriched = useMemo(() => {
    if (!products) return [];
    return products.map((product) => {
      const summary = summaries.find((s) => s.productId === product.id);
      return {
        product,
        summary: summary || createEmptyInventorySummary(product.id),
        alertStatus: getInventoryAlertStatus(summary?.currentStock ?? 0, product.lowStockThreshold),
      };
    });
  }, [products, summaries]);

  /**
   * Apply search (normalized) + status filter.
   * Both operations work on the same derived list — no extra DB queries.
   */
  const visibleItems = useMemo(() => {
    const normalized = normalizeText(searchQuery);
    return allEnriched.filter((item) => {
      const matchesSearch = !normalized || normalizeText(item.product.name).includes(normalized);
      const matchesFilter = activeFilter === null || item.alertStatus === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [allEnriched, searchQuery, activeFilter]);

  /** Summary counts always reflect the WHOLE catalogue (not filtered view). */
  const metrics = useMemo(() => {
    return allEnriched.reduce(
      (acc, item) => {
        if (item.alertStatus === 'out_of_stock') acc.outOfStock++;
        else if (item.alertStatus === 'low_stock') acc.lowStock++;
        else acc.healthy++;
        return acc;
      },
      { healthy: 0, lowStock: 0, outOfStock: 0 },
    );
  }, [allEnriched]);

  /** Filtered sections — derived from visibleItems, not separate lists. */
  const sections = useMemo(() => {
    const low = visibleItems.filter((i) => i.alertStatus === 'low_stock');
    const empty = visibleItems.filter((i) => i.alertStatus === 'out_of_stock');
    const healthy = visibleItems.filter((i) => i.alertStatus === 'healthy');
    return { needsRestocking: low, outOfStock: empty, inStock: healthy };
  }, [visibleItems]);

  const handleFilterToggle = (filter: InventoryAlertStatus) => {
    setActiveFilter((prev) => (prev === filter ? null : filter));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 pb-4 pt-4 border-b border-gray-100 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Stock</h1>
            <p className="text-xs text-gray-400 mt-0.5">What should I restock today?</p>
          </div>
        </div>

        {/* 3 Summary / Filter Cards */}
        {!isLoading && !error && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleFilterToggle('healthy')}
              aria-pressed={activeFilter === 'healthy'}
              className={`flex flex-col items-center rounded-2xl px-3 py-3.5 transition-all duration-150 ${
                activeFilter === 'healthy'
                  ? 'bg-green-600 border-2 border-green-600 shadow-md scale-[0.97]'
                  : 'bg-green-50 border border-green-100 hover:border-green-300 active:scale-[0.97]'
              }`}
            >
              <p
                className={`text-2xl font-black ${activeFilter === 'healthy' ? 'text-white' : 'text-green-700'}`}
              >
                {metrics.healthy}
              </p>
              <p
                className={`text-xs font-semibold text-center mt-1 ${activeFilter === 'healthy' ? 'text-green-100' : 'text-green-800'}`}
              >
                Healthy
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleFilterToggle('low_stock')}
              aria-pressed={activeFilter === 'low_stock'}
              className={`flex flex-col items-center rounded-2xl px-3 py-3.5 transition-all duration-150 ${
                activeFilter === 'low_stock'
                  ? 'bg-yellow-500 border-2 border-yellow-500 shadow-md scale-[0.97]'
                  : 'bg-yellow-50 border border-yellow-200 hover:border-yellow-400 active:scale-[0.97]'
              }`}
            >
              <p
                className={`text-2xl font-black ${activeFilter === 'low_stock' ? 'text-white' : 'text-yellow-700'}`}
              >
                {metrics.lowStock}
              </p>
              <p
                className={`text-xs font-semibold text-center mt-1 ${activeFilter === 'low_stock' ? 'text-yellow-100' : 'text-yellow-800'}`}
              >
                Low Stock
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleFilterToggle('out_of_stock')}
              aria-pressed={activeFilter === 'out_of_stock'}
              className={`flex flex-col items-center rounded-2xl px-3 py-3.5 transition-all duration-150 ${
                activeFilter === 'out_of_stock'
                  ? 'bg-red-600 border-2 border-red-600 shadow-md scale-[0.97]'
                  : 'bg-red-50 border border-red-200 hover:border-red-400 active:scale-[0.97]'
              }`}
            >
              <p
                className={`text-2xl font-black ${activeFilter === 'out_of_stock' ? 'text-white' : 'text-red-600'}`}
              >
                {metrics.outOfStock}
              </p>
              <p
                className={`text-xs font-semibold text-center mt-1 ${activeFilter === 'out_of_stock' ? 'text-red-100' : 'text-red-800'}`}
              >
                Out of Stock
              </p>
            </button>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-full border-0 py-2.5 pl-9 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm bg-gray-50"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Clear Filter Prompt */}
        {activeFilter !== null && (
          <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-xl">
            <span className="text-sm font-semibold text-blue-900 capitalize">
              Filtering by: {activeFilter.replace('_', ' ')}
            </span>
            <button
              onClick={() => setActiveFilter(null)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-500 active:scale-[0.98] transition-all"
            >
              Show All
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
        {isLoading ? (
          <InventoryLoading />
        ) : error ? (
          <InventoryError error={error} />
        ) : allEnriched.length === 0 ? (
          <InventoryEmpty />
        ) : visibleItems.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            {searchQuery
              ? `No products found matching "${searchQuery}"`
              : 'No products in this category.'}
          </p>
        ) : (
          <>
            {/* Needs Restocking Section */}
            {sections.needsRestocking.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span>⚠️</span> Needs Restocking
                  </h2>
                  <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-bold text-yellow-800">
                    {sections.needsRestocking.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sections.needsRestocking.map(({ product, summary }) => (
                    <StockCard
                      key={product.id}
                      product={product}
                      summary={summary}
                      onAddStock={() => setStockToAdd({ id: product.id, name: product.name })}
                      onViewProduct={() => navigate(`/products/${product.id}`)}
                      onClick={() => navigate(`/inventory/${product.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Out of Stock Section */}
            {sections.outOfStock.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span>🔴</span> Out of Stock
                  </h2>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
                    {sections.outOfStock.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sections.outOfStock.map(({ product, summary }) => (
                    <StockCard
                      key={product.id}
                      product={product}
                      summary={summary}
                      onAddStock={() => setStockToAdd({ id: product.id, name: product.name })}
                      onViewProduct={() => navigate(`/products/${product.id}`)}
                      onClick={() => navigate(`/inventory/${product.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* In Stock Section */}
            {sections.inStock.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <span>🟢</span> In Stock
                  </h2>
                  <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800">
                    {sections.inStock.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sections.inStock.map(({ product, summary }) => (
                    <StockCard
                      key={product.id}
                      product={product}
                      summary={summary}
                      onAddStock={() => setStockToAdd({ id: product.id, name: product.name })}
                      onViewProduct={() => navigate(`/products/${product.id}`)}
                      onClick={() => navigate(`/inventory/${product.id}`)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Add Stock Sheet Modal */}
      {stockToAdd && (
        <AddStockSheet
          productId={stockToAdd.id}
          productName={stockToAdd.name}
          onSuccess={() => setStockToAdd(null)}
          onClose={() => setStockToAdd(null)}
        />
      )}
    </div>
  );
};
