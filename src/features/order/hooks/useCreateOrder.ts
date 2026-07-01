import { useState } from 'react';
import { CreateOrderDTO } from '../types';
import { useOrderUseCases } from './OrderContext';

export function useCreateOrder() {
  const { createOrder } = useOrderUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (dto: CreateOrderDTO): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await createOrder.execute(dto);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create order'));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { createOrder: execute, isSaving, error };
}
