import { OrderRepository } from '../domain/OrderRepository';
import { Order } from '../types';

export class GetOrderById {
  constructor(private readonly repository: OrderRepository) {}

  async execute(id: string): Promise<Order | null> {
    return await this.repository.findById(id);
  }
}
