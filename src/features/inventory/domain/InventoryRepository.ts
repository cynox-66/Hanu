import { InventorySummary, StockMovement } from '../types';

/**
 * Repository interface for Inventory persistence.
 * This belongs to the Domain layer and is implemented by the Infrastructure layer.
 */
export interface InventoryRepository {
  /**
   * Persists a new StockMovement. Immutable — never updates.
   * This is an atomic operation that ALSO updates the corresponding InventorySummary
   * in the same transaction. The Application layer never saves summaries directly.
   */
  recordMovement(movement: StockMovement): Promise<void>;

  /**
   * Retrieves all movements for a specific product, ordered by createdAt DESC.
   * Used for the product stock detail page.
   */
  findMovementsByProductId(productId: string): Promise<StockMovement[]>;

  /**
   * Retrieves the inventory summary for a specific product.
   * Returns null if no movements have ever been recorded.
   */
  findSummaryByProductId(productId: string): Promise<InventorySummary | null>;

  /**
   * Retrieves all inventory summaries (one per product that has movements).
   * Used for the inventory dashboard.
   */
  findAllSummaries(): Promise<InventorySummary[]>;

  /**
   * Diagnostic operation to completely rebuild and save a summary from the ledger.
   * Required for RebuildSummary use case.
   */
  forceSaveSummary(summary: InventorySummary): Promise<void>;
}
