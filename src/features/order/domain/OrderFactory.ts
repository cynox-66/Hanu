import { CreateOrderDTO, Order, UpdateOrderDTO } from '../types';

/**
 * Domain Factory for creating new Order entities.
 * Enforces business invariants such as calculating total amount and generated IDs.
 */
export function createOrderFromDTO(dto: CreateOrderDTO): Order {
  const now = new Date().toISOString();

  // Calculate total amount from items
  const totalAmount = dto.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  return {
    ...dto,
    id: crypto.randomUUID(),
    totalAmount,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Domain Factory for updating an existing Order.
 *
 * Enforces immutability of historical snapshots:
 *   - id, createdAt, customerId, customerName, items, and totalAmount
 *     are always preserved from the existing Order.
 *
 * Only editable fields (status, notes) from UpdateOrderDTO are applied.
 * updatedAt is generated here — never in the Application layer.
 *
 * The narrow UpdateOrderDTO structurally prevents callers from even passing
 * historical fields — immutability is enforced at the type level, not just runtime.
 */
export function updateOrder(existingOrder: Order, updates: UpdateOrderDTO): Order {
  return {
    // Immutable identity and historical snapshots — always from existingOrder
    id: existingOrder.id,
    createdAt: existingOrder.createdAt,
    customerId: existingOrder.customerId,
    customerName: existingOrder.customerName,
    items: existingOrder.items,
    totalAmount: existingOrder.totalAmount,
    // Editable fields from narrow DTO
    status: updates.status,
    notes: updates.notes,
    // Domain-generated timestamp
    updatedAt: new Date().toISOString(),
  };
}
