import { ProductRepository } from '../domain/ProductRepository';

export class DeleteProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
