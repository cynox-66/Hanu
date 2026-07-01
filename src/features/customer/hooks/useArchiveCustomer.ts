import { useState, useCallback } from 'react';
import { useCustomerUseCases } from './CustomerContext';

export function useArchiveCustomer() {
  const { archiveCustomer } = useCustomerUseCases();
  const [isArchiving, setIsArchiving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const archive = useCallback(
    async (id: string) => {
      setIsArchiving(true);
      setError(null);
      try {
        await archiveCustomer.execute(id);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to archive customer'));
        throw err;
      } finally {
        setIsArchiving(false);
      }
    },
    [archiveCustomer],
  );

  return { archive, isArchiving, error };
}
