/**
 * Validates product pricing business rules.
 * Throws friendly error messages suitable for display to the user.
 *
 * @param sellingPrice - The price at which the product is sold
 * @param costPrice - The price at which the product is acquired (optional)
 * @throws Error if validation fails
 */
export function validateProductPricing(sellingPrice: number, costPrice?: number): void {
  // Selling Price Validation
  if (
    sellingPrice === undefined ||
    sellingPrice === null ||
    !Number.isFinite(sellingPrice) ||
    sellingPrice <= 0
  ) {
    throw new Error('Please enter a valid selling price.');
  }

  // Cost Price Validation (Optional)
  if (costPrice !== undefined && costPrice !== null) {
    if (!Number.isFinite(costPrice) || costPrice < 0) {
      throw new Error('Please enter a valid cost price.');
    }
  }
}
