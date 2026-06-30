import { ProductRepository } from '../domain/ProductRepository';
import { Product } from '../types';

export class GetProductById {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.repository.findById(id);
  }
}
