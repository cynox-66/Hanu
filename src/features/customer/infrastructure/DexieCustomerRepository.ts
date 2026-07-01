import { CustomerRepository } from '../domain/CustomerRepository';
import { Customer } from '../types';
import { db } from '../../../infrastructure/db/database';

export class DexieCustomerRepository implements CustomerRepository {
  async findById(id: string): Promise<Customer | null> {
    const customer = await db.customers.get(id);
    return customer || null;
  }

  async findAll(): Promise<Customer[]> {
    return await db.customers.where('status').notEqual('archived').toArray();
  }

  async save(customer: Customer): Promise<void> {
    await db.customers.put(customer);
  }

  async archive(id: string): Promise<void> {
    await db.customers.update(id, { status: 'archived' });
  }

  async delete(id: string): Promise<void> {
    await db.customers.delete(id);
  }
}
