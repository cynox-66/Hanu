import { ProductRepository } from '../domain/ProductRepository';
import { UpdateProductDTO, Product } from '../types';

export class EditProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(existingProduct: Product, updates: UpdateProductDTO): Promise<Product> {
    const updatedProduct: Product = {
      ...existingProduct,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await this.repository.save(updatedProduct);
    return updatedProduct;
  }
}
