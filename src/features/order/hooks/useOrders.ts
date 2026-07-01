import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../infrastructure/db/database';
import { Order } from '../types';

/**
 * Returns all non-archived orders as a live query.
 * Auto-updates when a new sale is created.
 */
export function useOrders() {
  const orders = useLiveQuery<Order[]>(
    () => db.orders.where('status').notEqual('archived').toArray(),
    [],
  );

  const isLoading = orders === undefined;
  return { orders: orders ?? [], isLoading, error: null };
}
