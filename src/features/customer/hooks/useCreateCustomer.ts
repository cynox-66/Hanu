import { useState, useCallback } from 'react';
import { CreateCustomerDTO } from '../types';
import { useCustomerUseCases } from './CustomerContext';

export function useCreateCustomer() {
  const { createCustomer } = useCustomerUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = useCallback(
    async (dto: CreateCustomerDTO) => {
      setIsSaving(true);
      setError(null);
      try {
        await createCustomer.execute(dto);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to create customer'));
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [createCustomer],
  );

  return { create, isSaving, error };
}
