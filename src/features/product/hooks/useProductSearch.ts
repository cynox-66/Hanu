import { useState, useMemo } from 'react';
import { Product } from '../types';
import { SearchProducts } from '../application/SearchProducts';

export function useProductSearch(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const searchUseCase = new SearchProducts();
    return searchUseCase.execute(products, searchQuery);
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
  };
}
