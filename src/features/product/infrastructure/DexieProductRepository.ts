import { ProductRepository } from '../domain/ProductRepository';
import { Product } from '../types';
import { db } from '../../../infrastructure/db/database';
import { normalizeText } from '../../../shared/utils/normalizeText';

export class DexieProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    const product = await db.products.get(id);
    return product || null;
  }

  async findAll(): Promise<Product[]> {
    return await db.products.where('status').notEqual('archived').toArray();
  }

  /**
   * Finds a product by its normalized name (case-insensitive, whitespace-collapsed).
   * Searches ALL products regardless of status (including archived) to prevent
   * re-use of a name that was previously used for an archived product.
   */
  async findByNormalizedName(normalizedName: string): Promise<Product | null> {
    const result = await db.products
      .filter((p) => normalizeText(p.name) === normalizedName)
      .first();
    return result ?? null;
  }

  async save(product: Product): Promise<void> {
    await db.products.put(product);
  }

  async archive(id: string): Promise<void> {
    await db.products.update(id, { status: 'archived' });
  }
}
