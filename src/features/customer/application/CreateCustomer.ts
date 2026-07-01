import { CustomerRepository } from '../domain/CustomerRepository';
import { CreateCustomerDTO } from '../types';
import { createCustomerFromDTO } from '../domain/CustomerFactory';

export class CreateCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(dto: CreateCustomerDTO): Promise<void> {
    const existing = await this.repository.findByPhone(dto.phone);
    if (existing) {
      throw new Error('This phone number already belongs to another customer.');
    }
    const customer = createCustomerFromDTO(dto);
    await this.repository.save(customer);
  }
}
