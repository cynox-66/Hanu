import { CustomerRepository } from '../domain/CustomerRepository';
import { Customer } from '../types';

export class GetCustomerById {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(id: string): Promise<Customer | null> {
    return this.repository.findById(id);
  }
}
