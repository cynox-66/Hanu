import { Order } from '../types';

/**
 * Repository interface for Order persistence.
 * This belongs to the Domain layer and is implemented by the Infrastructure layer.
 */
export interface OrderRepository {
  /**
   * Retrieves an order by its unique identifier.
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Retrieves all orders.
   */
  findAll(): Promise<Order[]>;

  /**
   * Saves an order (create or update).
   */
  save(order: Order): Promise<void>;

  /**
   * Archives an order rather than hard-deleting it, adhering to Rule 3.
   * "Deleting business history should be extremely rare. Archive instead."
   */
  archive(id: string): Promise<void>;

  /**
   * Hard deletes an order. (Used only in exceptional cases).
   */
}
