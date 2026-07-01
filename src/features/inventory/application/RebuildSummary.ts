import { InventoryRepository } from '../domain/InventoryRepository';
import { rebuildInventorySummary } from '../domain/InventoryFactory';

export class RebuildSummary {
  constructor(private readonly repository: InventoryRepository) {}

  async execute(productId: string): Promise<void> {
    const movements = await this.repository.findMovementsByProductId(productId);

    // Sort chronological (oldest to newest) for accurate rebuild,
    // though repository returns them DESC, we should reverse to ASC for rebuild
    const chronologicalMovements = [...movements].reverse();

    const summary = rebuildInventorySummary(productId, chronologicalMovements);
    await this.repository.forceSaveSummary(summary);
  }
}
