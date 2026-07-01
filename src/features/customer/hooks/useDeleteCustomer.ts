import { useState, useCallback } from 'react';
import { useCustomerUseCases } from './CustomerContext';

export function useDeleteCustomer() {
  const { deleteCustomer } = useCustomerUseCases();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      setError(null);
      try {
        await deleteCustomer.execute(id);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to delete customer'));
        throw err;
      } finally {
        setIsDeleting(false);
      }
    },
    [deleteCustomer],
  );

  return { remove, isDeleting, error };
}
