import React, { useState } from 'react';
import { useRecordMovement } from '../../hooks';
import { formatCurrency } from '../../../../shared/utils/currency';
import { MAX_STOCK_MOVEMENT_QUANTITY, MIN_STOCK_QUANTITY } from '../../domain/InventoryFactory';

export interface AddStockSheetProps {
  productId: string;
  productName: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const AddStockSheet: React.FC<AddStockSheetProps> = ({
  productId,
  productName,
  onSuccess,
  onClose,
}) => {
  const { recordMovement, isSaving, error } = useRecordMovement();
  const [quantity, setQuantity] = useState(1);
  const [costPerUnit, setCostPerUnit] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await recordMovement({
      productId,
      productName,
      reason: 'purchase',
      quantity,
      costPerUnit: costPerUnit ? Number(costPerUnit) : null,
      referenceId: null,
      referenceType: 'manual',
      notes: notes || null,
    });

    if (success) {
      onSuccess();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Add Stock"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-t-3xl bg-white p-6 pb-10 shadow-xl animate-slide-up">
        {/* Handle */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-300" />

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Stock</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close"
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

        <p className="text-sm text-gray-500 mb-5">
          Adding stock to <strong className="text-gray-800">{productName}</strong>
        </p>

        {error && (
          <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-800">{error.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              How many units are you adding?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(MIN_STOCK_QUANTITY, q - 1))}
                disabled={quantity <= MIN_STOCK_QUANTITY}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-2xl font-bold transition-colors active:bg-gray-100 disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                id="stock-qty"
                type="number"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) {
                    setQuantity(
                      Math.min(MAX_STOCK_MOVEMENT_QUANTITY, Math.max(MIN_STOCK_QUANTITY, v)),
                    );
                  }
                }}
                min={MIN_STOCK_QUANTITY}
                max={MAX_STOCK_MOVEMENT_QUANTITY}
                className="w-20 rounded-xl border border-gray-200 py-3 text-center text-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(MAX_STOCK_MOVEMENT_QUANTITY, q + 1))}
                disabled={quantity >= MAX_STOCK_MOVEMENT_QUANTITY}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-2xl font-bold transition-colors active:bg-gray-100 disabled:opacity-40"
                aria-label="Increase quantity"
              >
                +
              </button>
              <span className="text-sm text-gray-400">of {MAX_STOCK_MOVEMENT_QUANTITY} max</span>
            </div>
          </div>

          <div>
            <label htmlFor="stock-cost" className="block text-sm font-medium text-gray-700 mb-1.5">
              Cost per unit (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <span className="text-gray-500 font-medium">₹</span>
              </div>
              <input
                id="stock-cost"
                type="number"
                inputMode="decimal"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="block w-full rounded-xl border-0 py-3.5 pl-8 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-gray-900"
              />
            </div>
            {costPerUnit && (
              <p className="mt-1 text-xs text-gray-500 font-medium">
                {formatCurrency(Number(costPerUnit))}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="stock-notes" className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes (optional)
            </label>
            <input
              id="stock-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Supplier name, batch info..."
              className="block w-full rounded-xl border-0 py-3.5 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={quantity < MIN_STOCK_QUANTITY || isSaving}
            className="mt-2 w-full rounded-xl bg-gray-900 px-4 py-4 text-base font-bold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 transition-opacity"
          >
            {isSaving ? 'Saving...' : `Confirm — Add ${quantity} unit${quantity === 1 ? '' : 's'}`}
          </button>
        </form>
      </div>
    </div>
  );
};
