import { InventoryRepository } from '../domain/InventoryRepository';
import { StockMovement } from '../types';

export class GetMovementsByProduct {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(productId: string): Promise<StockMovement[]> {
    return await this.repository.findMovementsByProductId(productId);
  }
}
