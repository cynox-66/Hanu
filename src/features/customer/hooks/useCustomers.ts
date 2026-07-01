import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../infrastructure/db/database';
import { Customer } from '../types';

/**
 * Returns all non-archived customers as a live query.
 * Auto-updates when a customer is created, edited, or archived.
 */
export function useCustomers() {
  const customers = useLiveQuery<Customer[]>(
    () => db.customers.where('status').notEqual('archived').toArray(),
    [],
  );

  const isLoading = customers === undefined;
  return { customers: customers ?? [], isLoading, error: null };
}
