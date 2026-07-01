import { CustomerRepository } from '../domain/CustomerRepository';
import { Customer } from '../types';

export class GetCustomers {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(): Promise<Customer[]> {
    return this.repository.findAll();
  }
}
