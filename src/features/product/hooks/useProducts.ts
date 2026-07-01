import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../infrastructure/db/database';
import { Product } from '../types';

/**
 * Returns all non-archived products as a live query.
 * Auto-updates on any product mutation.
 */
export function useProducts() {
  const products = useLiveQuery<Product[]>(
    () => db.products.where('status').notEqual('archived').toArray(),
    [],
  );

  const isLoading = products === undefined;
  return { products: products ?? [], isLoading, error: null };
}

export function useActiveProducts() {
  const products = useLiveQuery<Product[]>(
    () => db.products.where('status').equals('active').toArray(),
    [],
  );

  const isLoading = products === undefined;
  return { products: products ?? [], isLoading, error: null };
}
