import { OrderRepository } from '../domain/OrderRepository';

export class ArchiveOrder {
  constructor(private readonly repository: OrderRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.archive(id);
  }
}
