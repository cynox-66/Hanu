import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from './ProductForm';
import { useCreateProduct } from '../hooks';
import { useRecordMovement } from '../../inventory/hooks';
import { CreateProductDTO } from '../types';
import { MAX_STOCK_MOVEMENT_QUANTITY } from '../../inventory/domain/InventoryFactory';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { create, isSaving } = useCreateProduct();
  const { recordMovement } = useRecordMovement();
  const [error, setError] = useState<string | null>(null);
  const [openingStock, setOpeningStock] = useState(0);

  const handleSubmit = async (dto: CreateProductDTO) => {
    setError(null);
    try {
      // create() now returns the newly generated product ID
      const productId = await create(dto);

      // Record opening stock if set — uses the real productId from above
      if (openingStock > 0) {
        await recordMovement({
          productId,
          productName: dto.name,
          reason: 'opening_stock',
          quantity: openingStock,
          costPerUnit: null,
          referenceId: null,
          referenceType: 'manual',
          notes: 'Opening stock on product creation',
        });
      }

      navigate('/products');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while saving the product. Please try again.',
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-white px-4 pb-3 pt-safe-top shadow-sm pt-3">
        <button
          onClick={() => navigate(-1)}
          className="-ml-2 rounded-full p-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          aria-label="Go back"
        >
          <svg
            className="h-6 w-6 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-900">New Product</h1>
      </header>

      <main className="flex-1 px-4 py-6 pb-safe-bottom" id="create-product-main">
        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* Opening Stock — shown before the product form for visibility */}
        <section className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <label className="block text-sm font-semibold text-gray-900 mb-1">Opening Stock</label>
          <p className="text-xs text-gray-400 mb-4">
            How many units do you have right now? You can update this later from the product page.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpeningStock((q) => Math.max(0, q - 1))}
              disabled={openingStock <= 0}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-xl font-bold transition-colors active:bg-gray-100 disabled:opacity-40"
              aria-label="Decrease opening stock"
            >
              −
            </button>
            <input
              type="number"
              min={0}
              max={MAX_STOCK_MOVEMENT_QUANTITY}
              value={openingStock}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v)) {
                  setOpeningStock(Math.min(MAX_STOCK_MOVEMENT_QUANTITY, Math.max(0, v)));
                }
              }}
              className="w-20 rounded-xl border border-gray-200 py-2.5 text-center text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              id="opening-stock-input"
            />
            <button
              type="button"
              onClick={() => setOpeningStock((q) => Math.min(MAX_STOCK_MOVEMENT_QUANTITY, q + 1))}
              disabled={openingStock >= MAX_STOCK_MOVEMENT_QUANTITY}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-xl font-bold transition-colors active:bg-gray-100 disabled:opacity-40"
              aria-label="Increase opening stock"
            >
              +
            </button>
            <span className="text-sm text-gray-400 ml-1">
              units (max {MAX_STOCK_MOVEMENT_QUANTITY})
            </span>
          </div>
          {openingStock === 0 && (
            <p className="mt-2 text-xs text-gray-400">Leave at 0 to add stock later.</p>
          )}
        </section>

        <ProductForm onSubmit={handleSubmit} isSubmitting={isSaving} />
      </main>
    </div>
  );
};
