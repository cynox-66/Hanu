import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, useArchiveProduct, useProductSearch } from '../hooks';
import { ProductCard } from './ProductCard';
import {
  ProductListSkeleton,
  ProductListEmpty,
  ProductListError,
  ProductListNoSearchResults,
} from './ProductListStates';

export const ProductList: React.FC = () => {
  const { products, isLoading, error, refetch } = useProducts();
  const { archive, isArchiving } = useArchiveProduct();
  const { searchQuery, setSearchQuery, filteredProducts } = useProductSearch(products);
  const [productToArchive, setProductToArchive] = useState<{ id: string; name: string } | null>(
    null,
  );

  const handleArchiveConfirm = async () => {
    if (!productToArchive) return;
    try {
      await archive(productToArchive.id);
      await refetch();
    } catch (err) {
      console.error('Failed to archive product:', err);
    } finally {
      setProductToArchive(null);
    }
  };

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (error) {
    return <ProductListError onRetry={refetch} />;
  }

  if (products.length === 0) {
    return <ProductListEmpty />;
  }

  return (
    <>
      <div className="mb-6 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="block w-full rounded-xl border-0 bg-white py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {searchQuery && filteredProducts.length === 0 ? (
        <ProductListNoSearchResults searchQuery={searchQuery} onClear={() => setSearchQuery('')} />
      ) : (
        <ul className="flex flex-col gap-3" aria-label="Product list">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}/edit`}
                className="block focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-2xl"
              >
                <ProductCard
                  product={product}
                  onArchive={() => setProductToArchive({ id: product.id, name: product.name })}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {productToArchive && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900">Archive Product?</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to archive <strong>{productToArchive.name}</strong>? It will be
              removed from the active catalogue but not permanently deleted.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
              <button
                onClick={handleArchiveConfirm}
                disabled={isArchiving}
                className="flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 disabled:opacity-50"
              >
                {isArchiving ? 'Archiving...' : 'Yes, Archive'}
              </button>
              <button
                onClick={() => setProductToArchive(null)}
                disabled={isArchiving}
                className="flex w-full items-center justify-center rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
