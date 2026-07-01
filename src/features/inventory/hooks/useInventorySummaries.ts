import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../infrastructure/db/database';
import { InventorySummary } from '../types';

/**
 * Returns all inventory summaries as a live Dexie query.
 * Automatically re-renders any subscribed component when the DB changes.
 * No manual refetch needed — reactivity is handled by Dexie's observable.
 */
export function useInventorySummaries() {
  const summaries = useLiveQuery<InventorySummary[]>(() => db.inventorySummaries.toArray(), []);

  const isLoading = summaries === undefined;
  return { summaries: summaries ?? [], isLoading, error: null };
}
