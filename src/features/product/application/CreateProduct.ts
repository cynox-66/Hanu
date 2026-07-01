import { ProductRepository } from '../domain/ProductRepository';
import { CreateProductDTO } from '../types';
import { createProductFromDTO } from '../domain/ProductFactory';
import { normalizeText } from '../../../shared/utils/normalizeText';

export class CreateProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(dto: CreateProductDTO): Promise<string> {
    const normalized = normalizeText(dto.name);
    const existing = await this.repository.findByNormalizedName(normalized);
    if (existing) {
      throw new Error('A product with this name already exists.');
    }
    const product = createProductFromDTO(dto);
    await this.repository.save(product);
    return product.id;
  }
}
