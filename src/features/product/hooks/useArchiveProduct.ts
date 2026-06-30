import { useState, useCallback } from 'react';
import { useProductUseCases } from './ProductContext';

export function useArchiveProduct() {
  const { archiveProduct } = useProductUseCases();
  const [isArchiving, setIsArchiving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const archive = useCallback(async (id: string) => {
    setIsArchiving(true);
    setError(null);
    try {
      await archiveProduct.execute(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to archive product'));
      throw err;
    } finally {
      setIsArchiving(false);
    }
  }, [archiveProduct]);

  return { archive, isArchiving, error };
}
