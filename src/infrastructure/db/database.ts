import Dexie, { type Table } from 'dexie';
import type { Product } from '../../features/product/types';
import type { Customer } from '../../features/customer/types';

export class HanuDatabase extends Dexie {
  products!: Table<Product, string>;
  customers!: Table<Customer, string>;

  constructor() {
    super('HanuDatabase');

    // Define schema
    this.version(1).stores({
      products: 'id, name, category, status, updatedAt',
      customers: 'id, status', // Indexes justified: id (PK), status (filtering archived)
    });
  }
}

export const db = new HanuDatabase();
