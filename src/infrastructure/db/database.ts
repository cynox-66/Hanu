import Dexie, { type Table } from 'dexie';
import type { Product } from '../../features/product/types';
import type { Customer } from '../../features/customer/types';
import type { Order } from '../../features/order/types';
import type { StockMovement, InventorySummary } from '../../features/inventory/types';

export class HanuDatabase extends Dexie {
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;
  orders!: Table<Order, string>;
  stockMovements!: Table<StockMovement, string>;
  inventorySummaries!: Table<InventorySummary, string>;

  constructor() {
    super('HanuDatabase');

    // Define schema
    this.version(2).stores({
      products: 'id, name, category, status, updatedAt',
      customers: 'id, status', // Indexes justified: id (PK), status (filtering archived)
      orders: 'id, customerId, status', // Indexes justified: id (PK), customerId (lookup), status (filtering archived)
    });

    this.version(3).stores({
      stockMovements: 'id, [productId+createdAt], createdAt', // Composite index for product history, createdAt for global history
      inventorySummaries: 'productId', // One summary per product
    });
  }
}

export const db = new HanuDatabase();
