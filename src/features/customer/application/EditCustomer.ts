import { CustomerRepository } from '../domain/CustomerRepository';
import { UpdateCustomerDTO, Customer } from '../types';
import { updateCustomer } from '../domain/CustomerFactory';

export class EditCustomer {
  constructor(private readonly repository: CustomerRepository) {}

  async execute(existingCustomer: Customer, updates: UpdateCustomerDTO): Promise<Customer> {
    // Only validate uniqueness when the phone number has actually changed.
    if (updates.phone.trim() !== existingCustomer.phone.trim()) {
      const conflict = await this.repository.findByPhone(updates.phone);
      if (conflict) {
        throw new Error('This phone number already belongs to another customer.');
      }
    }
    const updated = updateCustomer(existingCustomer, updates);
    await this.repository.save(updated);
    return updated;
  }
}
