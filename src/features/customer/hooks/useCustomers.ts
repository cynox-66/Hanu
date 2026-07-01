import { useState, useEffect, useCallback } from 'react';
import { Customer } from '../types';
import { useCustomerUseCases } from './CustomerContext';

export function useCustomers() {
  const { getCustomers } = useCustomerUseCases();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCustomers.execute();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch customers'));
    } finally {
      setIsLoading(false);
    }
  }, [getCustomers]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, isLoading, error, refetch: fetchCustomers };
}
