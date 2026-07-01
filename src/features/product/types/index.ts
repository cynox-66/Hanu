export type ProductStatus = 'active' | 'archived' | 'draft';

/**
 * Represents a Product entity in the Hanu domain.
 * A product is something the business sells.
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  images: string[];
  sellingPrice: number;
  costPrice?: number;
  stockQuantity: number;
  lowStockThreshold?: number;
  status: ProductStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO for creating a new Product.
 * Consumed exclusively by ProductFactory and the CreateProduct use case.
 * stockQuantity is intentionally absent — the domain invariant always initialises it to 0.
 */
export type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'stockQuantity'>;

/**
 * DTO for updating an existing Product.
 * Consumed exclusively by the EditProduct use case.
 * Kept as a distinct semantic type so future fields (e.g. inventory adjustments)
 * can diverge from CreateProductDTO without breaking the creation path.
 */
export type UpdateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'stockQuantity'>;
