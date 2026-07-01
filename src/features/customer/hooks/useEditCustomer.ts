import { useState, useCallback } from 'react';
import { UpdateCustomerDTO, Customer } from '../types';
import { useCustomerUseCases } from './CustomerContext';

export function useEditCustomer() {
  const { editCustomer } = useCustomerUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const edit = useCallback(
    async (existingCustomer: Customer, updates: UpdateCustomerDTO) => {
      setIsSaving(true);
      setError(null);
      try {
        return await editCustomer.execute(existingCustomer, updates);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to edit customer'));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [editCustomer],
  );

  return { edit, isSaving, error };
}
