/**
 * Normalizes a string for comparison purposes.
 *
 * Normalization pipeline:
 *   1. trim()       — removes leading/trailing whitespace
 *   2. toLowerCase() — makes comparison case-insensitive
 *   3. replace(/\s+/g, ' ') — collapses multiple internal spaces into one
 *
 * The STORED value is never modified — only the comparison is normalized.
 * This is the single, canonical normalization function for the entire Hanu codebase.
 * Import this wherever you need to compare or search text fields.
 *
 * @example
 * normalizeText('  Apple  Watch  ') === normalizeText('apple watch') // true
 */
export function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}
