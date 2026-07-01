import { CreateProductDTO, UpdateProductDTO, Product } from '../types';
import { validateProductPricing } from './ProductValidation';

/**
 * Domain Factory for creating new Product entities.
 * Enforces business invariants such as initial stock quantity and generated IDs.
 */
export function createProductFromDTO(dto: CreateProductDTO): Product {
  validateProductPricing(dto.sellingPrice, dto.costPrice);

  const now = new Date().toISOString();
  return {
    ...dto,
    status: dto.status ?? 'active',
    lowStockThreshold: dto.lowStockThreshold ?? 5,
    id: crypto.randomUUID(),
    stockQuantity: 0, // Invariant: New products start with 0 stock
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Domain Factory for updating an existing Product entity.
 *
 * Enforces immutability of invariants:
 *   - id and createdAt are always preserved from the existing Product.
 *   - stockQuantity is preserved — stock adjustments belong in a separate Inventory flow.
 *   - updatedAt is generated here — never in the Application layer.
 *
 * Only mutable fields (name, description, category, images, sellingPrice,
 * costPrice, status, notes) from UpdateProductDTO are applied.
 */
export function updateProduct(existingProduct: Product, updates: UpdateProductDTO): Product {
  validateProductPricing(updates.sellingPrice, updates.costPrice);

  return {
    // Immutable identity
    id: existingProduct.id,
    createdAt: existingProduct.createdAt,
    // Inventory is managed separately — never overwritten by a product edit
    stockQuantity: existingProduct.stockQuantity,
    // Mutable fields from DTO
    name: updates.name,
    description: updates.description,
    category: updates.category,
    images: updates.images,
    sellingPrice: updates.sellingPrice,
    costPrice: updates.costPrice,
    lowStockThreshold: updates.lowStockThreshold ?? existingProduct.lowStockThreshold ?? 5,
    status: updates.status,
    notes: updates.notes,
    // Domain-generated timestamp
    updatedAt: new Date().toISOString(),
  };
}
