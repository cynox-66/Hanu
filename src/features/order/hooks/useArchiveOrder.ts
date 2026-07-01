import { useState } from 'react';
import { useOrderUseCases } from './OrderContext';

export function useArchiveOrder() {
  const { archiveOrder } = useOrderUseCases();
  const [isArchiving, setIsArchiving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (id: string): Promise<boolean> => {
    setIsArchiving(true);
    setError(null);
    try {
      await archiveOrder.execute(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to archive order'));
      return false;
    } finally {
      setIsArchiving(false);
    }
  };

  return { archiveOrder: execute, isArchiving, error };
}
