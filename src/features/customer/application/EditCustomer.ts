import { CustomerRepository } from '../domain/CustomerRepository';
import { UpdateCustomerDTO, Customer } from '../types';

export class EditCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(existingCustomer: Customer, updates: UpdateCustomerDTO): Promise<Customer> {
    const updatedCustomer: Customer = {
      ...existingCustomer,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await this.repository.save(updatedCustomer);
    return updatedCustomer;
  }
}
