import React from 'react';
import { Customer } from '../../customer/types';

interface CustomerSelectorProps {
  customers: Customer[];
  selectedCustomer: string;
  onSelect: (id: string, name: string) => void;
}

export const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  customers,
  selectedCustomer,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedCustomer}
        onChange={(e) => {
          const id = e.target.value;
          if (!id) {
            onSelect('', '');
            return;
          }
          const customer = customers.find((c) => c.id === id);
          if (customer) {
            onSelect(customer.id, customer.name);
          }
        }}
        className="block w-full rounded-xl border-0 py-3 pl-3 pr-10 text-base shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm"
      >
        <option value="">Select a customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} {c.phone ? `(${c.phone})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
};
