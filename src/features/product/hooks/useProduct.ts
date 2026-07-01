import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../infrastructure/db/database';
import { Product } from '../types';

/**
 * Returns a single product by ID as a live query.
 * Auto-updates when the product is edited.
 */
export function useProduct(id: string) {
  const product = useLiveQuery<Product | null>(
    () => (id ? db.products.get(id).then((p) => p ?? null) : Promise.resolve(null)),
    [id],
  );

  const isLoading = product === undefined;
  return { product: product ?? null, isLoading, error: null };
}
