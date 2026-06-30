import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from './ProductForm';
import { useCreateProduct } from '../hooks';
import { CreateProductDTO } from '../types';

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { create, isSaving } = useCreateProduct();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (dto: CreateProductDTO) => {
    setError(null);
    try {
      await create(dto);
      navigate('/');
    } catch (err) {
      setError('An error occurred while saving the product. Please try again.');
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
          <svg className="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
        <ProductForm onSubmit={handleSubmit} isSubmitting={isSaving} />
      </main>
    </div>
  );
};
