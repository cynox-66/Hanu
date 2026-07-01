import { Product } from '../types';

/**
 * Repository interface for Product persistence.
 * This belongs to the Domain layer and is implemented by the Infrastructure layer.
 */
export interface ProductRepository {
  /**
   * Retrieves a product by its unique identifier.
   */
  findById(id: string): Promise<Product | null>;

  /**
   * Retrieves all products.
   */
  findAll(): Promise<Product[]>;

  /**
   * Finds a product whose normalized name matches the given normalized name.
   * "Normalized" means: trimmed, lowercased, with consecutive spaces collapsed.
   * Used by the application layer to enforce the unique-name business rule.
   * Searches ALL products regardless of status (including archived).
   */
  findByNormalizedName(normalizedName: string): Promise<Product | null>;

  /**
   * Saves a product (create or update).
   */
  save(product: Product): Promise<void>;

  /**
   * Archives a product rather than hard-deleting it, adhering to Rule 3.
   * "Deleting business history should be extremely rare. Archive instead."
   */
  archive(id: string): Promise<void>;

  /**
   * Hard deletes a product. (Used only in exceptional cases).
   */
}
