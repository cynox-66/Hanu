import Dexie, { type Table } from 'dexie';
import type { Product } from '../../features/product/types';

export class HanuDatabase extends Dexie {
  products!: Table<Product, string>;
  
  constructor() {
    super('HanuDatabase');
    
    // Define schema
    this.version(1).stores({
      products: 'id, name, category, status, updatedAt',
    });
  }
}

export const db = new HanuDatabase();
