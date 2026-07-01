import { useState } from 'react';
import { CreateStockMovementDTO } from '../types';
import { useInventoryUseCases } from './InventoryContext';

export function useRecordMovement() {
  const { recordMovement } = useInventoryUseCases();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (dto: CreateStockMovementDTO): Promise<boolean> => {
    setIsSaving(true);
    setError(null);
    try {
      await recordMovement.execute(dto);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to record stock movement'));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return { recordMovement: execute, isSaving, error };
}
