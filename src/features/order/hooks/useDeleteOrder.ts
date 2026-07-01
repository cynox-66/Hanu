import { useState } from 'react';
import { useOrderUseCases } from './OrderContext';

export function useDeleteOrder() {
  const { deleteOrder } = useOrderUseCases();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteOrder.execute(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete order'));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteOrder: execute, isDeleting, error };
}
