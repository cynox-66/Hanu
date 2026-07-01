import { useState, useMemo } from 'react';
import { Customer } from '../types';
import { SearchCustomers } from '../application/SearchCustomers';

export function useCustomerSearch(customers: Customer[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    const searchUseCase = new SearchCustomers();
    return searchUseCase.execute(customers, searchQuery);
  }, [customers, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCustomers,
  };
}
