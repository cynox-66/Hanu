import React, { useState, useCallback } from 'react';
import { formatCurrency } from '../../../shared/utils/currency';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProduct, useArchiveProduct } from '../hooks';
import { useInventorySummary } from '../../inventory/hooks';
import { createEmptyInventorySummary } from '../../inventory/domain/InventoryFactory';
import {
  getInventoryAlertStatus,
  getInventoryAlertBadge,
} from '../../inventory/domain/InventoryAlerts';
import { AddStockSheet } from '../../inventory/presentation/components/AddStockSheet';
import { PageHeader } from '../../../shared/components/PageHeader';

// ─── Product Detail Page ───────────────────────────────────────────────────────

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct(id!);
  const { summary, isLoading: summaryLoading } = useInventorySummary(id!);
  const { archive, isArchiving } = useArchiveProduct();

  const [showAddStock, setShowAddStock] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  const actualSummary = summary || createEmptyInventorySummary(id!);

  const handleStockAdded = useCallback(() => {
    setShowAddStock(false);
    // No manual refetch needed — useLiveQuery reacts automatically to the DB write
  }, []);

  const handleArchive = async () => {
    if (!product) return;
    await archive(product.id);
    navigate('/products');
  };

  const alertStatus = getInventoryAlertStatus(
    actualSummary.currentStock,
    product?.lowStockThreshold,
  );
  const stockStatus = getInventoryAlertBadge(alertStatus);

  if (isLoading || summaryLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <PageHeader title="Product" />
        <div className="flex flex-1 items-center justify-center">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !product || product.status === 'archived') {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <PageHeader title="Product" backTo="/products" />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h2 className="text-lg font-semibold text-gray-900">Product not found</h2>
          <p className="mt-2 text-sm text-gray-500">
            This product may have been archived or removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <PageHeader
        title={product.name}
        backTo="/products"
        action={
          <Link
            to={`/products/${product.id}/edit`}
            id="product-detail-edit-btn"
            className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Edit
          </Link>
        }
      />

      <main className="flex-1 px-4 py-5 flex flex-col gap-4 pb-10">
        {/* Product Image */}
        {product.images.length > 0 && (
          <div className="w-full rounded-2xl overflow-hidden bg-gray-100 aspect-square max-h-48 shadow-sm">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header Info */}
        <div className="flex items-start justify-between px-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            {product.category && <p className="text-sm text-gray-400 mt-0.5">{product.category}</p>}
          </div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${stockStatus.color}`}
          >
            {stockStatus.label}
          </span>
        </div>

        {/* Actions - Immediately Visible */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            id="product-add-stock-btn"
            onClick={() => setShowAddStock(true)}
            className="w-full rounded-2xl bg-gray-900 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
          >
            <span className="text-xl">📦</span>
            Add Stock
          </button>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/inventory/${product.id}`}
              id="product-stock-history-btn"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-3 text-sm font-semibold text-gray-700 active:scale-[0.98] transition-transform duration-150"
            >
              <span>📋</span>
              Stock History
            </Link>
            <Link
              to={`/products/${product.id}/edit`}
              id="product-edit-details-btn"
              className="flex items-center justify-center gap-2 rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-3 text-sm font-semibold text-gray-700 active:scale-[0.98] transition-transform duration-150"
            >
              <span>✏️</span>
              Edit Details
            </Link>
          </div>
        </div>

        {/* Details Card */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-5 mt-2">
          <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">
            Inventory & Pricing
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Selling Price</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(product.sellingPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Current Stock</p>
              <p className="text-lg font-bold text-gray-900">{actualSummary.currentStock}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Low Stock Alert</p>
              <p className="text-lg font-bold text-gray-700">{product.lowStockThreshold ?? 5}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Cost Price</p>
              <p className="text-base font-semibold text-gray-600">
                {formatCurrency(product.costPrice)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Inventory Value</p>
              <p className="text-base font-semibold text-gray-900">
                {product.costPrice != null
                  ? formatCurrency(actualSummary.currentStock * product.costPrice)
                  : '—'}
              </p>
            </div>
          </div>

          {product.description && (
            <div className="mt-5 border-t border-gray-100 pt-4">
              <h3 className="text-xs font-bold text-gray-900 mb-1.5 uppercase tracking-wide">
                Description
              </h3>
              <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="mt-4">
          <button
            onClick={() => setShowArchiveConfirm(true)}
            className="w-full text-sm text-gray-400 hover:text-red-600 transition-colors py-2"
            id="product-archive-btn"
          >
            Archive this product
          </button>
        </div>
      </main>

      {/* Add Stock Bottom Sheet */}
      {showAddStock && (
        <AddStockSheet
          productId={product.id}
          productName={product.name}
          onSuccess={handleStockAdded}
          onClose={() => setShowAddStock(false)}
        />
      )}

      {/* Archive Confirmation Dialog */}
      {showArchiveConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Archive Product?</h3>
            <p className="mt-2 text-sm text-gray-600">
              <strong>{product.name}</strong> will be removed from your active catalogue. You can
              find it in archived products later.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleArchive}
                disabled={isArchiving}
                className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50"
              >
                {isArchiving ? 'Archiving...' : 'Yes, Archive'}
              </button>
              <button
                onClick={() => setShowArchiveConfirm(false)}
                className="w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
