import React, { createContext, useContext, useMemo } from 'react';
import { CustomerRepository } from '../domain/CustomerRepository';
import { GetCustomers } from '../application/GetCustomers';
import { GetCustomerById } from '../application/GetCustomerById';
import { CreateCustomer } from '../application/CreateCustomer';
import { EditCustomer } from '../application/EditCustomer';
import { ArchiveCustomer } from '../application/ArchiveCustomer';
import { DeleteCustomer } from '../application/DeleteCustomer';

interface CustomerUseCases {
  getCustomers: GetCustomers;
  getCustomerById: GetCustomerById;
  createCustomer: CreateCustomer;
  editCustomer: EditCustomer;
  archiveCustomer: ArchiveCustomer;
  deleteCustomer: DeleteCustomer;
}

const CustomerContext = createContext<CustomerUseCases | null>(null);

interface CustomerProviderProps {
  repository: CustomerRepository;
  children: React.ReactNode;
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ repository, children }) => {
  const useCases = useMemo(() => {
    return {
      getCustomers: new GetCustomers(repository),
      getCustomerById: new GetCustomerById(repository),
      createCustomer: new CreateCustomer(repository),
      editCustomer: new EditCustomer(repository),
      archiveCustomer: new ArchiveCustomer(repository),
      deleteCustomer: new DeleteCustomer(repository),
    };
  }, [repository]);

  return <CustomerContext.Provider value={useCases}>{children}</CustomerContext.Provider>;
};

export const useCustomerUseCases = (): CustomerUseCases => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerUseCases must be used within a CustomerProvider');
  }
  return context;
};
