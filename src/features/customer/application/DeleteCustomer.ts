import { CustomerRepository } from '../domain/CustomerRepository';

export class DeleteCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
