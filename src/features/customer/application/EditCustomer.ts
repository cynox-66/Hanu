import { CustomerRepository } from '../domain/CustomerRepository';
import { UpdateCustomerDTO, Customer } from '../types';
import { updateCustomer } from '../domain/CustomerFactory';

export class EditCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(existingCustomer: Customer, updates: UpdateCustomerDTO): Promise<Customer> {
    const updated = updateCustomer(existingCustomer, updates);
    await this.repository.save(updated);
    return updated;
  }
}
