import { CreateStockMovementDTO, InventorySummary, MovementType, StockMovement } from '../types';

/** Maximum units allowed in a single stock-in movement (opening stock, purchase, add stock). */
export const MAX_STOCK_MOVEMENT_QUANTITY = 100;
/** Minimum units allowed in any positive movement. */
export const MIN_STOCK_QUANTITY = 1;

/**
 * Domain invariant: validates a stock movement quantity (stock_in or stock_out).
 * Throws a human-readable Error if the value is invalid.
 * Adjustments (corrections) pass through without this check.
 */
export function validateStockMovementQuantity(quantity: number): void {
  if (!Number.isFinite(quantity) || Number.isNaN(quantity)) {
    throw new Error('Please enter a valid quantity.');
  }
  if (!Number.isInteger(quantity)) {
    throw new Error('Quantity must be a whole number (no decimals).');
  }
  if (quantity < MIN_STOCK_QUANTITY) {
    throw new Error(`Quantity must be at least ${MIN_STOCK_QUANTITY}.`);
  }
  if (quantity > MAX_STOCK_MOVEMENT_QUANTITY) {
    throw new Error(
      `Please enter a quantity between ${MIN_STOCK_QUANTITY} and ${MAX_STOCK_MOVEMENT_QUANTITY}.`,
    );
  }
}

/**
 * Domain invariant: validates a sale quantity against the available stock for that product.
 * Throws a human-readable Error if overselling would occur.
 */
export function validateSaleQuantity(
  quantity: number,
  availableStock: number,
  productName: string,
): void {
  if (!Number.isFinite(quantity) || Number.isNaN(quantity) || quantity < 1) {
    throw new Error(`Please enter a valid quantity for ${productName}.`);
  }
  if (!Number.isInteger(quantity)) {
    throw new Error(`Quantity for ${productName} must be a whole number.`);
  }
  if (quantity > availableStock) {
    throw new Error(
      `Only ${availableStock} unit${availableStock === 1 ? '' : 's'} of "${productName}" ${availableStock === 1 ? 'is' : 'are'} available.`,
    );
  }
}

/**
 * Domain Factory for creating new StockMovement entities.
 * Enforces movement types and ensures positive quantities (except adjustments).
 */
export function createStockMovementFromDTO(dto: CreateStockMovementDTO): StockMovement {
  const now = new Date().toISOString();

  let type: MovementType;
  switch (dto.reason) {
    case 'opening_stock':
    case 'purchase':
    case 'return':
    case 'transfer_in':
      type = 'stock_in';
      break;
    case 'sale':
    case 'damage':
    case 'expiry':
    case 'transfer_out':
      type = 'stock_out';
      break;
    case 'correction':
    case 'other':
      type = 'adjustment';
      break;
    default:
      type = 'adjustment'; // Fallback for safety
  }

  // Domain invariant: quantity is always positive for stock_in and stock_out
  const quantity = type === 'adjustment' ? dto.quantity : Math.abs(dto.quantity);

  return {
    ...dto,
    id: crypto.randomUUID(),
    type,
    quantity,
    createdAt: now,
  };
}

/**
 * Pure Domain function to aggregate a list of StockMovements into a fresh InventorySummary.
 * Rebuilds the disposable projection from the ledger source of truth.
 */
export function rebuildInventorySummary(
  productId: string,
  movements: StockMovement[],
): InventorySummary {
  let currentStock = 0;
  let totalCostValue = 0;
  let lastMovementAt: string | null = null;

  // Assume movements are sorted chronological or we sort them here?
  // Let's ensure we process them properly. They are facts, order of addition matters for cost,
  // but sum is commutative.
  for (const movement of movements) {
    if (movement.type === 'stock_in') {
      currentStock += movement.quantity;
      if (movement.costPerUnit != null) {
        totalCostValue += movement.quantity * movement.costPerUnit;
      }
    } else if (movement.type === 'stock_out') {
      currentStock -= movement.quantity;
      // WAC valuation would reduce totalCostValue here proportionally, but we are not implementing WAC yet.
      // So totalCostValue only sums stock_in cost for now, as per simple implementation.
    } else if (movement.type === 'adjustment') {
      currentStock += movement.quantity;
    }

    if (!lastMovementAt || movement.createdAt > lastMovementAt) {
      lastMovementAt = movement.createdAt;
    }
  }

  // availableStock is currentStock for Sprint 1
  const availableStock = currentStock;

  return {
    productId,
    currentStock,
    availableStock,
    totalCostValue,
    lastMovementAt,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Pure Domain function to apply a single StockMovement to an existing InventorySummary.
 */
export function applyMovementDelta(
  summary: InventorySummary,
  movement: StockMovement,
): InventorySummary {
  let { currentStock, availableStock, totalCostValue, lastMovementAt } = summary;

  if (movement.type === 'stock_in') {
    currentStock += movement.quantity;
    availableStock += movement.quantity;
    if (movement.costPerUnit != null) {
      totalCostValue += movement.quantity * movement.costPerUnit;
    }
  } else if (movement.type === 'stock_out') {
    currentStock -= movement.quantity;
    availableStock -= movement.quantity;
  } else if (movement.type === 'adjustment') {
    currentStock += movement.quantity;
    availableStock += movement.quantity;
  }

  if (!lastMovementAt || movement.createdAt > lastMovementAt) {
    lastMovementAt = movement.createdAt;
  }

  return {
    ...summary,
    currentStock,
    availableStock,
    totalCostValue,
    lastMovementAt,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Creates an empty InventorySummary for a product that has no movements yet.
 */
export function createEmptyInventorySummary(productId: string): InventorySummary {
  return {
    productId,
    currentStock: 0,
    availableStock: 0,
    totalCostValue: 0,
    lastMovementAt: null,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Helper to determine if a movement reason corresponds to an adjustment.
 */
export function isAdjustmentReason(reason: string): boolean {
  return reason === 'correction' || reason === 'other';
}
