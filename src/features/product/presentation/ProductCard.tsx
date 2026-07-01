import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onArchive?: (id: string) => void;
}

const STATUS_CONFIG: Record<Product['status'], { label: string; className: string }> = {
  active: { label: 'Active', className: 'bg-green-100 text-green-800' },
  draft: { label: 'Draft', className: 'bg-yellow-100 text-yellow-800' },
  archived: { label: 'Archived', className: 'bg-gray-100 text-gray-500' },
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, onArchive }) => {
  const status = STATUS_CONFIG[product.status];
  const hasImage = product.images.length > 0;

  return (
    <div
      className="flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm active:scale-[0.98] transition-transform duration-150 relative group"
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      {/* Image / placeholder */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
        {hasImage ? (
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <svg
            className="h-8 w-8 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="truncate text-base font-semibold text-gray-900">{product.name}</p>
        {product.category && <p className="truncate text-sm text-gray-500">{product.category}</p>}
      </div>

      {/* Price + Status + Action */}
      <div className="flex shrink-0 flex-col items-end gap-1 relative z-10">
        {onArchive ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onArchive(product.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={`Archive ${product.name}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </button>
        ) : (
          <p className="text-base font-bold text-gray-900">
            ₹{product.sellingPrice.toLocaleString('en-IN')}
          </p>
        )}
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}
          aria-label={`Status: ${status.label}`}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
};
