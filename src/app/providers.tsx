import { AppRouter } from './router';
import { ProductProvider } from '../features/product';
import { DexieProductRepository } from '../features/product/infrastructure/DexieProductRepository';

// Application Composition Root
const productRepository = new DexieProductRepository();

export function Providers() {
  return (
    <ProductProvider repository={productRepository}>
      <AppRouter />
    </ProductProvider>
  );
}
