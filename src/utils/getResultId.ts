import { Barbell } from "../types";

/**
 * Utility for creating a unique id for each result, mainly
 * for the purposes of providing a unique key when rendering.
 *
 * @param totalWeight
 * @param plates
 * @param barbell
 */
export default function getResultId(
  totalWeight: number,
  plates: number[],
  barbell: Barbell
): string {
  return `result-${barbell.id}-${totalWeight}-${plates.toString()}`;
}
