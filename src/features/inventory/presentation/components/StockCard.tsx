import React from 'react';
import { Product } from '../../../product/types';
import { InventorySummary } from '../../types';
import { getInventoryAlertStatus, getInventoryAlertBadge } from '../../domain/InventoryAlerts';
import { formatCurrency } from '../../../../shared/utils/currency';

interface StockCardProps {
  product: Product;
  summary: InventorySummary;
  onAddStock: (e: React.MouseEvent) => void;
  onViewProduct?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({
  product,
  summary,
  onAddStock,
  onViewProduct,
  onClick,
}) => {
  const alertStatus = getInventoryAlertStatus(summary.currentStock, product.lowStockThreshold);
  const badge = getInventoryAlertBadge(alertStatus);
  const hasImage = product.images.length > 0;
  const threshold = product.lowStockThreshold ?? 5;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 ${
        onClick ? 'cursor-pointer hover:border-gray-200 transition-colors' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Image */}
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
          {hasImage ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xl">📦</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="truncate text-base font-bold text-gray-900">{product.name}</h3>
          {alertStatus === 'out_of_stock' ? (
            <span
              className={`inline-block mt-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.color}`}
            >
              Out of Stock
            </span>
          ) : alertStatus === 'low_stock' ? (
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-bold text-yellow-800">Stock: {summary.currentStock}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Alert at: {threshold}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-semibold text-green-700">Stock: {summary.currentStock}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Value: {formatCurrency(summary.totalCostValue)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100/80">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAddStock(e);
          }}
          className="flex-1 rounded-xl bg-gray-900 px-3 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition-colors active:scale-[0.98] text-center"
        >
          Add Stock
        </button>
        {alertStatus === 'out_of_stock' && onViewProduct && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct(e);
            }}
            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors active:scale-[0.98] text-center"
          >
            View Product
          </button>
        )}
      </div>
    </div>
  );
};
