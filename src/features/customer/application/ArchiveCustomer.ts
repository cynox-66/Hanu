import { CustomerRepository } from '../domain/CustomerRepository';

export class ArchiveCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.archive(id);
  }
}
