import Dexie, { type Table } from 'dexie';
import type { Product } from '../../features/product/types';
import type { Customer } from '../../features/customer/types';
import type { Order } from '../../features/order/types';

export class HanuDatabase extends Dexie {
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;
  orders!: Table<Order, string>;

  constructor() {
    super('HanuDatabase');

    // Define schema
    this.version(2).stores({
      products: 'id, name, category, status, updatedAt',
      customers: 'id, status', // Indexes justified: id (PK), status (filtering archived)
      orders: 'id, customerId, status', // Indexes justified: id (PK), customerId (lookup), status (filtering archived)
    });
  }
}

export const db = new HanuDatabase();
