import { OrderRepository } from '../domain/OrderRepository';
import { Order } from '../types';

export class GetOrders {
  constructor(private readonly repository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return await this.repository.findAll();
  }
}
