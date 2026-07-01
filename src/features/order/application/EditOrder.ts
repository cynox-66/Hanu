import { OrderRepository } from '../domain/OrderRepository';
import { UpdateOrderDTO, Order } from '../types';
import { updateOrder } from '../domain/OrderFactory';

export class EditOrder {
  constructor(private readonly repository: OrderRepository) {}

  async execute(existingOrder: Order, updates: UpdateOrderDTO): Promise<Order> {
    const updated = updateOrder(existingOrder, updates);
    await this.repository.save(updated);
    return updated;
  }
}
