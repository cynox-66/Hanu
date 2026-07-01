import { Customer } from '../types';

/**
 * Repository interface for Customer persistence.
 * This belongs to the Domain layer and is implemented by the Infrastructure layer.
 */
export interface CustomerRepository {
  /**
   * Retrieves a customer by its unique identifier.
   */
  findById(id: string): Promise<Customer | null>;

  /**
   * Retrieves all customers.
   */
  findAll(): Promise<Customer[]>;

  /**
   * Saves a customer (create or update).
   */
  save(customer: Customer): Promise<void>;

  /**
   * Archives a customer rather than hard-deleting it, adhering to Rule 3.
   * "Deleting business history should be extremely rare. Archive instead."
   */
  archive(id: string): Promise<void>;

  /**
   * Hard deletes a customer. (Used only in exceptional cases).
   */
  delete(id: string): Promise<void>;
}
