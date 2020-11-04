/**
 * Get the sum of all provided plates, doubled
 *
 * @param plates
 */
export default function getPlatesTotalWeight(plates: number[]): number {
  return plates.reduce((prev, current) => prev + current) * 2;
}
