import { ProductRepository } from '../domain/ProductRepository';
import { UpdateProductDTO, Product } from '../types';
import { updateProduct } from '../domain/ProductFactory';
import { normalizeText } from '../../../shared/utils/normalizeText';

export class EditProduct {
  constructor(private readonly repository: ProductRepository) {}

  async execute(existingProduct: Product, updates: UpdateProductDTO): Promise<Product> {
    // Only validate uniqueness when the name has actually changed.
    if (normalizeText(updates.name) !== normalizeText(existingProduct.name)) {
      const conflict = await this.repository.findByNormalizedName(normalizeText(updates.name));
      if (conflict) {
        throw new Error('A product with this name already exists.');
      }
    }
    const updated = updateProduct(existingProduct, updates);
    await this.repository.save(updated);
    return updated;
  }
}
