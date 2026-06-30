import { CreateProductDTO, Product } from '../types';

/**
 * Domain Factory for creating new Product entities.
 * Enforces business invariants such as initial stock quantity and generated IDs.
 */
export function createProductFromDTO(dto: CreateProductDTO): Product {
  const now = new Date().toISOString();
  return {
    ...dto,
    id: crypto.randomUUID(),
    stockQuantity: 0, // Invariant: New products start with 0 stock
    createdAt: now,
    updatedAt: now,
  };
}
