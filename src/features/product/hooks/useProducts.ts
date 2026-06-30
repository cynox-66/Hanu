import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { useProductUseCases } from './ProductContext';

export function useProducts() {
  const { getProducts } = useProductUseCases();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts.execute();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setIsLoading(false);
    }
  }, [getProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
}
