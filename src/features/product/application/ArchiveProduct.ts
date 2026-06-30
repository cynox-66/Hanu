import { ProductRepository } from '../domain/ProductRepository';

export class ArchiveProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.archive(id);
  }
}
