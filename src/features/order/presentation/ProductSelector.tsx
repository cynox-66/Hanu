import React, { useState } from 'react';
import { Product } from '../../product/types';

interface ProductSelectorProps {
  products: Product[];
  onAdd: (product: Product) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ products, onAdd }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const handleAdd = () => {
    if (!selectedProductId) return;
    const product = products.find((p) => p.id === selectedProductId);
    if (product) {
      onAdd(product);
      setSelectedProductId('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="block flex-1 rounded-xl border-0 py-3 pl-3 pr-10 text-base shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
      >
        <option value="">Select a product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} - ₹{p.sellingPrice.toLocaleString('en-IN')}
          </option>
        ))}
      </select>
      <button
        onClick={handleAdd}
        disabled={!selectedProductId}
        className="flex shrink-0 items-center justify-center rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors"
      >
        Add
      </button>
    </div>
  );
};
