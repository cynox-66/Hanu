import { useState, useMemo } from 'react';
import { Customer } from '../types';
import { SearchCustomers } from '../application/SearchCustomers';

// SearchCustomers is a stateless, repository-independent use case.
// It is instantiated directly here rather than pulled from the DI context.
const searchCustomers = new SearchCustomers();

export function useCustomerSearch(customers: Customer[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = useMemo(() => {
    return searchCustomers.execute(customers, searchQuery);
  }, [customers, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCustomers,
  };
}
