import { useState, useCallback } from 'react';
import { useProductUseCases } from './ProductContext';

export function useDeleteProduct() {
  const { deleteProduct } = useProductUseCases();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      setError(null);
      try {
        await deleteProduct.execute(id);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to delete product'));
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    [deleteProduct],
  );

  return { remove, isDeleting, error };
}
