import { AppRouter } from './router';
import { ProductProvider } from '../features/product';
import { DexieProductRepository } from '../features/product/infrastructure/DexieProductRepository';
import { CustomerProvider } from '../features/customer';
import { DexieCustomerRepository } from '../features/customer/infrastructure/DexieCustomerRepository';
import { OrderProvider } from '../features/order';
import { DexieOrderRepository } from '../features/order/infrastructure/DexieOrderRepository';

// Application Composition Root
const productRepository = new DexieProductRepository();
const customerRepository = new DexieCustomerRepository();
const orderRepository = new DexieOrderRepository();

export function Providers() {
  return (
    <ProductProvider repository={productRepository}>
      <CustomerProvider repository={customerRepository}>
        <OrderProvider repository={orderRepository}>
          <AppRouter />
        </OrderProvider>
      </CustomerProvider>
    </ProductProvider>
  );
}
