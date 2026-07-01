import { Customer } from '../types';
import { normalizeText } from '../../../shared/utils/normalizeText';

export class SearchCustomers {
  execute(customers: Customer[], query: string): Customer[] {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
      return customers;
    }

    const cleanPhoneQuery = normalizedQuery.replace(/\s+/g, '');

    return customers.filter((customer) => {
      const nameMatch = normalizeText(customer.name).includes(normalizedQuery);
      const phoneMatch = customer.phone.replace(/\s+/g, '').includes(cleanPhoneQuery);
      const emailMatch = customer.email
        ? normalizeText(customer.email).includes(normalizedQuery)
        : false;

      return nameMatch || phoneMatch || emailMatch;
    });
  }
}
