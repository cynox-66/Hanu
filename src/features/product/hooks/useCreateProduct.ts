import { useState, useCallback } from 'react';
import { CreateProductDTO } from '../types';
import { useProductUseCases } from './ProductContext';

export function useCreateProduct() {
  const { createProduct } = useProductUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(
    async (dto: CreateProductDTO) => {
      setIsSaving(true);
      setError(null);
      try {
        await createProduct.execute(dto);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to create product'));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [createProduct],
  );

  return { create, isSaving, error };
}
