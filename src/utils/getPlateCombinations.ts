/**
 * Function for retrieving all possible combinations of plates.
 *
 * @param plates array of all available plates, [45, 25, 10, ...]
 * @return array of all possible combinations [[45, 25], [25, 10], ...]
 */
export default function getPlateCombinations(
  plates: number[]
): number[][] | null {
  if (!plates || !plates.length) {
    return null;
  }
  const foundCombinations: Record<string, boolean> = {};
  const getCombinations = (
    current: number[],
    rest: number[],
    results: number[][]
  ): number[][] | null => {
    if (!current.length && !rest.length) {
      return null;
    }
    if (!rest.length) {
      if (!foundCombinations[`${current}`]) {
        foundCombinations[`${current}`] = true;
        results.push(current);
      }
    } else {
      getCombinations([...current, rest[0]], rest.slice(1), results);
      getCombinations(current, rest.slice(1), results);
    }
    return results;
  };
  return getCombinations([], plates, []);
}
