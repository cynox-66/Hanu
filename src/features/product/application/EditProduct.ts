import { ProductRepository } from '../domain/ProductRepository';
import { UpdateProductDTO, Product } from '../types';
import { updateProduct } from '../domain/ProductFactory';

export class EditProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(existingProduct: Product, updates: UpdateProductDTO): Promise<Product> {
    const updated = updateProduct(existingProduct, updates);
    await this.repository.save(updated);
    return updated;
  }
}
