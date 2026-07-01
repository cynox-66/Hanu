import { CreateCustomerDTO, Customer } from '../types';

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
