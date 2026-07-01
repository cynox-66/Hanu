import { Order } from '../types';

export class SearchOrders {
  execute(orders: Order[], query: string): Order[] {
    if (!query || !query.trim()) {
      return orders;
    }

    const lowerQuery = query.toLowerCase().trim();

    return orders.filter((order) => {
      const idMatch = order.id.toLowerCase().includes(lowerQuery);
      const customerMatch = order.customerName.toLowerCase().includes(lowerQuery);
      const statusMatch = order.status.toLowerCase().includes(lowerQuery);

      return idMatch || customerMatch || statusMatch;
    });
  }
}
