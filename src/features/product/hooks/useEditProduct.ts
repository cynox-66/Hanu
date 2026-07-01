import { useState, useCallback } from 'react';
import { UpdateProductDTO, Product } from '../types';
import { useProductUseCases } from './ProductContext';

export function useEditProduct() {
  const { editProduct } = useProductUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const edit = useCallback(
    async (existingProduct: Product, updates: UpdateProductDTO) => {
      setIsSaving(true);
      setError(null);
      try {
        return await editProduct.execute(existingProduct, updates);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to edit product'));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [editProduct],
  );

  return { edit, isSaving, error };
}
