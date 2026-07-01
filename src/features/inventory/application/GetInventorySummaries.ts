import { InventoryRepository } from '../domain/InventoryRepository';
import { InventorySummary } from '../types';

export class GetInventorySummaries {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(): Promise<InventorySummary[]> {
    return await this.repository.findAllSummaries();
  }
}
