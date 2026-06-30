import { ProductRepository } from '../domain/ProductRepository';
import { CreateProductDTO } from '../types';
import { createProductFromDTO } from '../domain/ProductFactory';

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<void> {
    const product = createProductFromDTO(dto);
    await this.repository.save(product);
  }
}
