import { CustomerRepository } from '../domain/CustomerRepository';
import { CreateCustomerDTO } from '../types';
import { createCustomerFromDTO } from '../domain/CustomerFactory';

export class CreateCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(dto: CreateCustomerDTO): Promise<void> {
    const customer = createCustomerFromDTO(dto);
    await this.repository.save(customer);
  }
}
