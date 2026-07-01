import React from 'react';
import { OrderItem } from '../types';
import { formatCurrency } from '../../../shared/utils/currency';

interface OrderItemRowProps {
  item: OrderItem;
  maxQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const OrderItemRow: React.FC<OrderItemRowProps> = ({
  item,
  maxQuantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const subtotal = item.quantity * item.unitPrice;
  const atMax = item.quantity >= maxQuantity;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 p-3 bg-gray-50 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-gray-900">{item.productName}</p>
          <p className="text-xs text-gray-500">{formatCurrency(item.unitPrice)} each</p>
        </div>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-600 focus:outline-none transition-colors"
          aria-label="Remove item"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
            <button
              onClick={onDecrease}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-900"
              aria-label="Decrease quantity"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            <button
              onClick={onIncrease}
              disabled={atMax}
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-900"
              aria-label="Increase quantity"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          {atMax && (
            <p className="text-xs text-amber-600 font-medium">Only {maxQuantity} in stock</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-gray-900">{formatCurrency(subtotal)}</span>
          <span className="text-xs text-gray-400 mt-1">Total</span>
        </div>
      </div>
    </div>
  );
};
