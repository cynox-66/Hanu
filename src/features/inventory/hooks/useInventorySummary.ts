import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../infrastructure/db/database';
import { InventorySummary } from '../types';

/**
 * Returns the inventory summary for a specific product as a live query.
 * Re-renders automatically when stock changes (sale, add stock, correction).
 */
export function useInventorySummary(productId: string) {
  const summary = useLiveQuery<InventorySummary | null>(
    () => db.inventorySummaries.get(productId).then((s) => s ?? null),
    [productId],
  );

  // useLiveQuery returns undefined while loading
  const isLoading = summary === undefined;
  return { summary: summary ?? null, isLoading, error: null };
}
