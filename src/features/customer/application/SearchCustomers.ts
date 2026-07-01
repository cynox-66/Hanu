import { Customer } from '../types';

export class SearchCustomers {
  execute(customers: Customer[], query: string): Customer[] {
    if (!query || !query.trim()) {
      return customers;
    }

    const lowerQuery = query.toLowerCase().trim();

    return customers.filter((customer) => {
      const nameMatch = customer.name.toLowerCase().includes(lowerQuery);
      const phoneMatch = customer.phone.toLowerCase().includes(lowerQuery);
      const emailMatch = customer.email ? customer.email.toLowerCase().includes(lowerQuery) : false;

      return nameMatch || phoneMatch || emailMatch;
    });
  }
}
