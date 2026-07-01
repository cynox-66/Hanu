import React, { useState } from 'react';
import { CreateProductDTO, UpdateProductDTO, ProductStatus } from '../types';
import { formatCurrency } from '../../../shared/utils/currency';
import { validateProductPricing } from '../domain/ProductValidation';

interface ProductFormProps {
  initialValues?: Partial<CreateProductDTO | UpdateProductDTO>;
  onSubmit: (data: CreateProductDTO | UpdateProductDTO) => void;
  isSubmitting?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [category, setCategory] = useState(initialValues?.category || '');
  const [sellingPrice, setSellingPrice] = useState(initialValues?.sellingPrice?.toString() || '');
  const [costPrice, setCostPrice] = useState(initialValues?.costPrice?.toString() || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [notes, setNotes] = useState(initialValues?.notes || '');
  const [status] = useState<ProductStatus>(initialValues?.status || 'active');
  const [lowStockThreshold, setLowStockThreshold] = useState(initialValues?.lowStockThreshold ?? 5);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    }

    try {
      validateProductPricing(
        sellingPrice ? Number(sellingPrice) : NaN,
        costPrice ? Number(costPrice) : undefined,
      );
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('selling')) {
          newErrors.sellingPrice = err.message;
        } else if (err.message.includes('cost')) {
          newErrors.costPrice = err.message;
        }
      }
    }

    if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 1 || lowStockThreshold > 100) {
      newErrors.lowStockThreshold = 'Must be a whole number between 1 and 100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        name: name.trim(),
        category: category.trim() || undefined,
        sellingPrice: Number(sellingPrice),
        costPrice: costPrice ? Number(costPrice) : undefined,
        description: description.trim() || undefined,
        notes: notes.trim() || undefined,
        status,
        lowStockThreshold,
        images: initialValues?.images || [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Image Placeholder */}
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8">
        <svg
          className="h-8 w-8 text-gray-400 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <span className="text-sm font-medium text-gray-600">Upload Product Image</span>
        <span className="text-xs text-gray-400 mt-1">(Coming soon)</span>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`block w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900`}
            placeholder="E.g., Silk Saree"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Pricing row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Selling Price *
            </label>
            <input
              id="sellingPrice"
              type="number"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className={`block w-full rounded-xl border ${errors.sellingPrice ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900`}
              placeholder="0.00"
            />
            {sellingPrice && !errors.sellingPrice && (
              <p className="mt-1 text-xs font-medium text-gray-500">
                {formatCurrency(Number(sellingPrice))}
              </p>
            )}
            {errors.sellingPrice && (
              <p className="mt-1 text-sm text-red-500">{errors.sellingPrice}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price
            </label>
            <input
              id="costPrice"
              type="number"
              step="0.01"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className={`block w-full rounded-xl border ${errors.costPrice ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900`}
              placeholder="0.00"
            />
            {costPrice && !errors.costPrice && (
              <p className="mt-1 text-xs font-medium text-gray-500">
                {formatCurrency(Number(costPrice))}
              </p>
            )}
            {errors.costPrice && <p className="mt-1 text-sm text-red-500">{errors.costPrice}</p>}
          </div>
        </div>

        {/* Smart Warnings */}
        {!errors.sellingPrice &&
          !errors.costPrice &&
          Number(sellingPrice) > 0 &&
          Number(costPrice) > 0 &&
          Number(sellingPrice) < Number(costPrice) && (
            <div className="rounded-xl bg-orange-50 border border-orange-100 p-3">
              <p className="text-sm font-medium text-orange-800 flex items-center gap-2">
                <span>⚠️</span> You&apos;ll lose money on every sale of this product.
              </p>
            </div>
          )}
        {!errors.sellingPrice &&
          !errors.costPrice &&
          Number(sellingPrice) > 0 &&
          Number(costPrice) > 0 &&
          Number(sellingPrice) === Number(costPrice) && (
            <div className="rounded-xl bg-blue-50 border border-blue-100 p-3">
              <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                <span>ℹ️</span> This product will make no profit.
              </p>
            </div>
          )}
        {!errors.sellingPrice && Number(sellingPrice) > 1000000 && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-100 p-3">
            <p className="text-sm font-medium text-yellow-800 flex items-center gap-2">
              <span>👀</span> That price seems unusually high. Please double-check.
            </p>
          </div>
        )}

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Optional"
          />
        </div>

        {/* Low Stock Alert */}
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
          <label className="block text-sm font-semibold text-gray-900 mb-1">Low Stock Alert</label>
          <p className="text-xs text-gray-500 mb-3">
            We will alert you when stock drops to or below this number.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLowStockThreshold((q) => Math.max(1, q - 1))}
              disabled={lowStockThreshold <= 1}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 text-xl font-bold transition-colors active:bg-gray-100 disabled:opacity-40"
              aria-label="Decrease low stock alert"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              max={100}
              value={lowStockThreshold}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v)) {
                  setLowStockThreshold(Math.min(100, Math.max(1, v)));
                }
              }}
              className="w-20 rounded-xl border border-gray-300 py-2.5 text-center text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              id="low-stock-threshold-input"
            />
            <button
              type="button"
              onClick={() => setLowStockThreshold((q) => Math.min(100, q + 1))}
              disabled={lowStockThreshold >= 100}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 text-xl font-bold transition-colors active:bg-gray-100 disabled:opacity-40"
              aria-label="Increase low stock alert"
            >
              +
            </button>
            <span className="text-sm text-gray-500 ml-1">units (default: 5)</span>
          </div>
          {errors.lowStockThreshold && (
            <p className="mt-1 text-xs text-red-600">{errors.lowStockThreshold}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Details about the product"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Private Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Only visible to you"
          />
        </div>
      </div>

      <div className="pt-4 pb-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gray-900 px-4 py-4 text-center font-medium text-white shadow-sm transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
        >
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
};
