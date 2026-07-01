import { OrderRepository } from '../domain/OrderRepository';
import { Order } from '../types';
import { db } from '../../../infrastructure/db/database';

export class DexieOrderRepository implements OrderRepository {
  async findById(id: string): Promise<Order | null> {
    const order = await db.orders.get(id);
    return order || null;
  }

  async findAll(): Promise<Order[]> {
    return await db.orders.where('status').notEqual('archived').toArray();
  }

  async save(order: Order): Promise<void> {
    await db.orders.put(order);
  }

  async archive(id: string): Promise<void> {
    await db.orders.update(id, { status: 'archived' });
  }

  async delete(id: string): Promise<void> {
    await db.orders.delete(id);
  }
}
