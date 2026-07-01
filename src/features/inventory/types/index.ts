export type MovementType = 'stock_in' | 'stock_out' | 'adjustment';

export type MovementReason =
  | 'opening_stock'
  | 'purchase'
  | 'sale'
  | 'return'
  | 'damage'
  | 'expiry'
  | 'correction'
  | 'transfer_in'
  | 'transfer_out'
  | 'other';

export type ReferenceType = 'manual' | 'order' | 'purchase' | 'transfer' | 'return';

/**
 * An immutable record of a single stock change.
 */
export interface StockMovement {
  id: string; // UUID — Domain Factory
  productId: string; // FK → Product.id
  productName: string; // Snapshot (historical correctness)
  type: MovementType; // Derived from reason — Domain Factory
  reason: MovementReason; // User-selected
  quantity: number; // Positive for stock_in/stock_out; signed for adjustment
  costPerUnit: number | null; // Nullable (not all movements have cost)
  referenceId: string | null; // FK → Order.id, PurchaseOrder.id, etc.
  referenceType: ReferenceType; // Strict classification
  notes: string | null; // Free-text
  createdAt: string; // ISO timestamp — Domain Factory
}

/**
 * A disposable projection of current stock levels.
 * The ledger (StockMovement) is the source of truth.
 * This summary may always be rebuilt.
 */
export interface InventorySummary {
  productId: string; // PK, FK → Product.id (one per product)
  currentStock: number; // Derived: sum of movements
  availableStock: number; // Derived: currentStock - reserved (future)
  totalCostValue: number; // Derived: sum of stock_in cost
  lastMovementAt: string | null; // Timestamp of most recent movement
  updatedAt: string; // When this cache was last rebuilt
}

/**
 * DTO for creating a new StockMovement.
 * Excludes id, createdAt (Domain Factory), and type (derived from reason).
 */
export type CreateStockMovementDTO = Omit<StockMovement, 'id' | 'createdAt' | 'type'>;

export interface StockMovementFilterDTO {
  productId?: string;
  type?: MovementType;
  reason?: MovementReason;
  dateFrom?: string;
  dateTo?: string;
}
