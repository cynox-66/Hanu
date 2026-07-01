import { InventoryRepository } from '../domain/InventoryRepository';
import { InventorySummary } from '../types';

export class GetInventorySummary {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(productId: string): Promise<InventorySummary | null> {
    return await this.repository.findSummaryByProductId(productId);
  }
}
