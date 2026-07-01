import { AppRouter } from './router';
import { ProductProvider } from '../features/product';
import { DexieProductRepository } from '../features/product/infrastructure/DexieProductRepository';
import { CustomerProvider } from '../features/customer';
import { DexieCustomerRepository } from '../features/customer/infrastructure/DexieCustomerRepository';

// Application Composition Root
const productRepository = new DexieProductRepository();
const customerRepository = new DexieCustomerRepository();

export function Providers() {
  return (
    <ProductProvider repository={productRepository}>
      <CustomerProvider repository={customerRepository}>
        <AppRouter />
      </CustomerProvider>
    </ProductProvider>
  );
}
