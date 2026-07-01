import { useState, useEffect, useCallback } from 'react';
import { Customer } from '../types';
import { useCustomerUseCases } from './CustomerContext';

export function useCustomer(id: string) {
  const { getCustomerById } = useCustomerUseCases();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCustomer = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await getCustomerById.execute(id);
      setCustomer(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch customer'));
    } finally {
      setIsLoading(false);
    }
  }, [getCustomerById, id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  return { customer, isLoading, error, refetch: fetchCustomer };
}
