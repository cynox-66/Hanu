import { useState } from 'react';
import { Order, UpdateOrderDTO } from '../types';
import { useOrderUseCases } from './OrderContext';

export function useEditOrder() {
  const { editOrder } = useOrderUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (existingOrder: Order, updates: UpdateOrderDTO): Promise<Order | null> => {
    setIsSaving(true);
    setError(null);
    try {
      const updatedOrder = await editOrder.execute(existingOrder, updates);
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update order'));
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return { editOrder: execute, isSaving, error };
}
