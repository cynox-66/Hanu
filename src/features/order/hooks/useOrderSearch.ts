import { useState, useMemo } from 'react';
import { Order } from '../types';
import { SearchOrders } from '../application/SearchOrders';

export function useOrderSearch(orders: Order[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = useMemo(() => {
    const searchUseCase = new SearchOrders();
    return searchUseCase.execute(orders, searchQuery);
  }, [orders, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredOrders,
  };
}
