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
 * Consumed exclusively by the EditOrder use case.
 * Kept as a distinct semantic type so future fields can diverge from CreateOrderDTO.
 */
export type UpdateOrderDTO = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'totalAmount'>;
