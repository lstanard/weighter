/**
 * Function for retrieving all possible combinations of plates.
 *
 * TODO: This function has extremely poor performance and needs to be
 * re-written, probably without recursion.
 *
 * @param plates
 */
export default function getPlateCombinations(
  plates: number[]
): number[][] | [] {
  if (!plates || !plates.length) {
    return [];
  }

  const resultSet = new Set();

  if (plates.length === 1) {
    return [[plates[0]]];
  }

  // add only unique values to the set
  const addToResults = (newSet: number[]): void => {
    newSet.sort((a, b) => a - b);
    if (
      !Array.from(resultSet).some(
        (result) => (result as []).toString() === newSet.toString()
      )
    ) {
      resultSet.add(newSet);
    }
  };

  // add all provided plates
  addToResults(plates);

  plates
    .sort((a, b) => a - b)
    .forEach((plate: number, i: number) => {
      const otherPlates = [...plates];
      otherPlates.splice(i, 1);

      // add individual plate
      addToResults([plate]);
      // add remaining plates
      addToResults(otherPlates);

      // get subsets
      if (otherPlates.length > 1) {
        otherPlates.forEach((otherPlate: number, j: number) => {
          // assuming original array was [2.5,5,10,25,45], and the current plate is 2.5
          const subset = [...otherPlates];
          // splice value(s) from start of otherPlates [5,10,25,45] => [10,25,45]
          // store spliced value(s), [5]
          const splicedValues = subset.splice(0, 1 + j);

          // add new subset, along with plate and the subset together
          // [10,25,45] and [2.5,10,25,45]
          if (subset.length) {
            addToResults(subset);
            addToResults([plate, ...subset]);
          }
          // add any leftovers, along with plate and the leftovers together
          // [5] and [2.5,5]
          if (
            splicedValues.length &&
            splicedValues.length !== otherPlates.length
          ) {
            addToResults(splicedValues);
            addToResults([plate, ...splicedValues]);
          }
        });
      }
    });

  const setArray = Array.from(resultSet);
  // sort shortest to longest
  setArray.sort((a, b) => (a as []).length - (b as []).length);
  return setArray as number[][];
}
