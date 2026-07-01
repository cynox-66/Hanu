import { CreateCustomerDTO, UpdateCustomerDTO, Customer } from '../types';

/**
 * Domain Factory for creating new Customer entities.
 * Enforces business invariants such as generated IDs.
 */
export function createCustomerFromDTO(dto: CreateCustomerDTO): Customer {
  const now = new Date().toISOString();
  return {
    ...dto,
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Domain Factory for updating an existing Customer entity.
 *
 * Enforces immutability of invariants:
 *   - id and createdAt are always preserved from the existing Customer.
 *   - updatedAt is generated here — never in the Application layer.
 *
 * Only mutable fields (name, phone, email, address, status, notes)
 * from UpdateCustomerDTO are applied.
 */
export function updateCustomer(existingCustomer: Customer, updates: UpdateCustomerDTO): Customer {
  return {
    // Immutable identity
    id: existingCustomer.id,
    createdAt: existingCustomer.createdAt,
    // Mutable fields from DTO
    name: updates.name,
    phone: updates.phone,
    email: updates.email,
    address: updates.address,
    status: updates.status,
    notes: updates.notes,
    // Domain-generated timestamp
    updatedAt: new Date().toISOString(),
  };
}
