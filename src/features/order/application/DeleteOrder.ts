import { OrderRepository } from '../domain/OrderRepository';

export class DeleteOrder {
  constructor(private readonly repository: OrderRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
