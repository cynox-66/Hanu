import { Product } from '../types';
import { normalizeText } from '../../../shared/utils/normalizeText';

export class SearchProducts {
  execute(products: Product[], query: string): Product[] {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      const nameMatch = normalizeText(product.name).includes(normalizedQuery);
      const categoryMatch = product.category
        ? normalizeText(product.category).includes(normalizedQuery)
        : false;

      return nameMatch || categoryMatch;
    });
  }
}
