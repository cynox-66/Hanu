import { InventoryRepository } from '../domain/InventoryRepository';
import { InventorySummary, StockMovement } from '../types';
import { db } from '../../../infrastructure/db/database';
import { rebuildInventorySummary, applyMovementDelta } from '../domain/InventoryFactory';
import Dexie from 'dexie';

export class DexieInventoryRepository implements InventoryRepository {
  async recordMovement(movement: StockMovement): Promise<void> {
    await db.transaction('rw', db.stockMovements, db.inventorySummaries, async () => {
      // 1. Store the immutable movement
      await db.stockMovements.put(movement);

      // 2. Fetch the current summary
      let summary = await db.inventorySummaries.get(movement.productId);

      if (!summary) {
        // First movement for this product, rebuild from just this movement
        summary = rebuildInventorySummary(movement.productId, [movement]);
      } else {
        // Apply the delta using the domain function
        summary = applyMovementDelta(summary, movement);
      }

      // 3. Save the summary
      await db.inventorySummaries.put(summary);
    });
  }

  async findMovementsByProductId(productId: string): Promise<StockMovement[]> {
    // Requires composite index [productId+createdAt] to sort efficiently
    return await db.stockMovements
      .where('[productId+createdAt]')
      .between([productId, Dexie.minKey], [productId, Dexie.maxKey])
      .reverse()
      .toArray();
  }

  async findSummaryByProductId(productId: string): Promise<InventorySummary | null> {
    const summary = await db.inventorySummaries.get(productId);
    return summary || null;
  }

  async findAllSummaries(): Promise<InventorySummary[]> {
    return await db.inventorySummaries.toArray();
  }

  async forceSaveSummary(summary: InventorySummary): Promise<void> {
    await db.inventorySummaries.put(summary);
  }
}
