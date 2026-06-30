import { Product } from '../types';

export class SearchProducts {
  execute(products: Product[], query: string): Product[] {
    if (!query || !query.trim()) {
      return products;
    }
    
    const lowerQuery = query.toLowerCase().trim();
    
    return products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(lowerQuery);
      const categoryMatch = product.category 
        ? product.category.toLowerCase().includes(lowerQuery) 
        : false;
        
      return nameMatch || categoryMatch;
    });
  }
}
