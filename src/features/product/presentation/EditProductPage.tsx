import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from './ProductForm';
import { useProduct, useEditProduct } from '../hooks';
import { UpdateProductDTO } from '../types';

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading, error: fetchError } = useProduct(id!);
  const { edit, isSaving } = useEditProduct();
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSubmit = async (dto: UpdateProductDTO) => {
    if (!product) return;
    setSaveError(null);
    try {
      await edit(product, dto);
      navigate('/');
    } catch (_err) {
      setSaveError('An error occurred while saving changes. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8 items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
      </div>
    );
  }

  // Guard: archived products are not editable. Treat them as not found.
  if (fetchError || !product || product.status === 'archived') {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8 items-center justify-center text-center">
        <h2 className="text-lg font-semibold text-gray-900">Product not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 font-medium text-gray-900 underline">
          Go back
        </button>
      </div>
    );
  }

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
        <h1 className="text-xl font-bold text-gray-900">Edit Product</h1>
      </header>

      <main className="flex-1 px-4 py-6 pb-safe-bottom" id="edit-product-main">
        {saveError && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{saveError}</p>
          </div>
        )}
        <ProductForm initialValues={product} onSubmit={handleSubmit} isSubmitting={isSaving} />
      </main>
    </div>
  );
};
