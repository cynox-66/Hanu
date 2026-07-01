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

  /**
   * Finds a customer by phone number across ALL statuses (including archived).
   * This ensures phone numbers remain globally unique — even archived customers
   * block re-use of their phone number.
   */
  async findByPhone(phone: string): Promise<Customer | null> {
    const trimmed = phone.trim();
    const result = await db.customers.filter((c) => c.phone.trim() === trimmed).first();
    return result ?? null;
  }

  async save(customer: Customer): Promise<void> {
    await db.customers.put(customer);
  }

  async archive(id: string): Promise<void> {
    await db.customers.update(id, { status: 'archived' });
  }
}
