export type CustomerStatus = 'active' | 'archived';

/**
 * Represents a Customer entity in the Hanu domain.
 * A customer is someone who purchases products.
 */
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO for creating a new Customer.
 * Consumed exclusively by the CustomerFactory and CreateCustomer use case.
 */
export type CreateCustomerDTO = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * DTO for updating an existing Customer.
 * Consumed exclusively by the EditCustomer use case.
 * Kept as a distinct semantic type so future fields can diverge from CreateCustomerDTO.
 */
export type UpdateCustomerDTO = Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>;
