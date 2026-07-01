import { Order } from '../types';
import { normalizeText } from '../../../shared/utils/normalizeText';

export class SearchOrders {
  execute(orders: Order[], query: string): Order[] {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) {
      return orders;
    }

    return orders.filter((order) => {
      const idMatch = normalizeText(order.id).includes(normalizedQuery);
      const customerMatch = normalizeText(order.customerName).includes(normalizedQuery);
      const statusMatch = normalizeText(order.status).includes(normalizedQuery);

      return idMatch || customerMatch || statusMatch;
    });
  }
}
