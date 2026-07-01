import { StockMovement, StockMovementFilterDTO } from '../types';

export class SearchMovements {
  execute(movements: StockMovement[], filters: StockMovementFilterDTO): StockMovement[] {
    return movements.filter((movement) => {
      if (filters.productId && movement.productId !== filters.productId) {
        return false;
      }
      if (filters.type && movement.type !== filters.type) {
        return false;
      }
      if (filters.reason && movement.reason !== filters.reason) {
        return false;
      }
      if (filters.dateFrom && movement.createdAt < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && movement.createdAt > filters.dateTo) {
        return false;
      }
      return true;
    });
  }
}
