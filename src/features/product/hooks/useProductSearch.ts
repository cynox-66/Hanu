import { useState, useMemo } from 'react';
import { Product } from '../types';
import { SearchProducts } from '../application/SearchProducts';

// SearchProducts is a stateless, repository-independent use case.
// It is instantiated directly here rather than pulled from the DI context.
const searchProducts = new SearchProducts();

export function useProductSearch(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return searchProducts.execute(products, searchQuery);
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };
}
