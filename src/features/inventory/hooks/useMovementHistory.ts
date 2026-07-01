import { useState, useEffect, useCallback } from 'react';
import { StockMovement } from '../types';
import { useInventoryUseCases } from './InventoryContext';

export function useMovementHistory(productId: string) {
  const { getMovementsByProduct } = useInventoryUseCases();
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovements = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getMovementsByProduct.execute(productId);
      setMovements(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch movement history'));
    } finally {
      setIsLoading(false);
    }
  }, [getMovementsByProduct, productId]);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return { movements, isLoading, error, refetch: fetchMovements };
}
