import { useState, useEffect, useCallback } from 'react';
import { Order } from '../types';
import { useOrderUseCases } from './OrderContext';

export function useOrder(id: string | undefined) {
  const { getOrderById } = useOrderUseCases();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!id) {
      setOrder(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await getOrderById.execute(id);
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch order'));
    } finally {
      setIsLoading(false);
    }
  }, [id, getOrderById]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return { order, isLoading, error, refetch: fetchOrder };
}
