import { ProductRepository } from '../domain/ProductRepository';
import { Product } from '../types';
import { db } from '../../../infrastructure/db/database';

export class DexieProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    const product = await db.products.get(id);
    return product || null;
  }

  async findAll(): Promise<Product[]> {
    return await db.products.where('status').notEqual('archived').toArray();
  }

  async save(product: Product): Promise<void> {
    await db.products.put(product);
  }

  async archive(id: string): Promise<void> {
    await db.products.update(id, { status: 'archived' });
  }

  async delete(id: string): Promise<void> {
    await db.products.delete(id);
  }
}
