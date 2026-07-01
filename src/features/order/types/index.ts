export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'archived';

/**
 * Represents a single item within an Order.
 */
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

/**
 * Represents an Order entity in the Hanu domain.
 * An order tracks a purchase made by a customer.
 */
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * DTO for creating a new Order.
 * Consumed exclusively by OrderFactory and the CreateOrder use case.
 * totalAmount is intentionally absent — the domain invariant always calculates it.
 */
export type CreateOrderDTO = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'totalAmount'>;

/**
 * DTO for updating an existing Order.
 * Consumed exclusively by the EditOrder use case and updateOrder Domain function.
 *
 * Intentionally narrow: only `status` and `notes` are editable post-creation.
 * All historical data (customerId, customerName, items, totalAmount) is immutable
 * and enforced by the Domain Factory — this DTO structurally prevents passing them.
 */
export type UpdateOrderDTO = Pick<Order, 'status' | 'notes'>;
