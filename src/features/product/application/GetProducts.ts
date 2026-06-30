import { ProductRepository } from '../domain/ProductRepository';
import { Product } from '../types';

export class GetProducts {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repository.findAll();
  }
}
