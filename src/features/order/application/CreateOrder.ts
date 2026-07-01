import { OrderRepository } from '../domain/OrderRepository';
import { CreateOrderDTO } from '../types';
import { createOrderFromDTO } from '../domain/OrderFactory';

export class CreateOrder {
  constructor(private readonly repository: OrderRepository) {}

  async execute(dto: CreateOrderDTO): Promise<void> {
    const order = createOrderFromDTO(dto);
    await this.repository.save(order);
  }
}
