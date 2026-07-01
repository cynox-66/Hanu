/**
 * Shared utility to consistently format currency across the application.
 * Uses Indian number formatting (INR).
 *
 * @param amount - The numeric amount to format (e.g., 100000 -> ₹1,00,000)
 * @returns Formatted currency string or "—" if the value is missing or invalid.
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || !Number.isFinite(amount) || Number.isNaN(amount)) {
    return '—';
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}
