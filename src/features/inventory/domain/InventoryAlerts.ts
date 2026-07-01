export type InventoryAlertStatus = 'healthy' | 'low_stock' | 'out_of_stock';

export const DEFAULT_LOW_STOCK_THRESHOLD = 5;
export const MIN_LOW_STOCK_THRESHOLD = 1;
export const MAX_LOW_STOCK_THRESHOLD = 100;

/**
 * Validates the low stock threshold number.
 * Minimum: 1, Maximum: 100.
 */
export function validateLowStockThreshold(threshold: number): void {
  if (!Number.isFinite(threshold) || Number.isNaN(threshold)) {
    throw new Error('Please enter a valid Low Stock Alert number.');
  }
  if (!Number.isInteger(threshold)) {
    throw new Error('Low Stock Alert must be a whole number (no decimals).');
  }
  if (threshold < MIN_LOW_STOCK_THRESHOLD || threshold > MAX_LOW_STOCK_THRESHOLD) {
    throw new Error(
      `Low Stock Alert must be between ${MIN_LOW_STOCK_THRESHOLD} and ${MAX_LOW_STOCK_THRESHOLD}.`,
    );
  }
}

/**
 * Derives the inventory alert status for a product.
 * Healthy: stock > threshold
 * Low Stock: stock <= threshold and stock > 0
 * Out of Stock: stock == 0
 *
 * This logic exists ONLY here to guarantee domain consistency across UI components.
 */
export function getInventoryAlertStatus(
  currentStock: number,
  threshold: number = DEFAULT_LOW_STOCK_THRESHOLD,
): InventoryAlertStatus {
  if (currentStock <= 0) {
    return 'out_of_stock';
  }
  if (currentStock <= threshold) {
    return 'low_stock';
  }
  return 'healthy';
}

export function getInventoryAlertBadge(status: InventoryAlertStatus): {
  label: string;
  color: string;
} {
  switch (status) {
    case 'out_of_stock':
      return {
        label: 'Out of Stock',
        color: 'text-red-700 bg-red-50 ring-1 ring-inset ring-red-600/10',
      };
    case 'low_stock':
      return {
        label: 'Low Stock',
        color: 'text-yellow-800 bg-yellow-50 ring-1 ring-inset ring-yellow-600/20',
      };
    case 'healthy':
      return {
        label: 'In Stock',
        color: 'text-green-700 bg-green-50 ring-1 ring-inset ring-green-600/20',
      };
  }
}

export function getProductCardBadge(status: InventoryAlertStatus): {
  label: string;
  className: string;
} {
  switch (status) {
    case 'out_of_stock':
      return {
        label: '🔴 Out of Stock',
        className: 'bg-red-50 text-red-800 border border-red-200 font-semibold',
      };
    case 'low_stock':
      return {
        label: '🟡 Low Stock',
        className: 'bg-yellow-50 text-yellow-800 border border-yellow-200 font-semibold',
      };
    case 'healthy':
      return {
        label: '🟢 In Stock',
        className: 'bg-green-50 text-green-800 border border-green-200 font-semibold',
      };
  }
}
