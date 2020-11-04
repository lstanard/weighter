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
  const addToSet = (newSet: number[]): void => {
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
  addToSet(plates);

  plates
    .sort((a, b) => a - b)
    .forEach((plate: number, i: number, arr: number[]) => {
      const otherPlates = [...arr];
      otherPlates.splice(i, 1);

      console.log("plate", plate);

      // add individual plate
      addToSet([plate]);
      // add remaining plates
      addToSet(otherPlates);

      // get subsets
      if (otherPlates.length > 1) {
        otherPlates.forEach((otherPlate: number, j: number) => {
          const subset = [...otherPlates];
          const leftovers = subset.splice(0, 1 + j);

          if (leftovers.length !== otherPlates.length) {
            console.log("leftovers", leftovers);
            addToSet(leftovers);
            addToSet([plate, ...leftovers]);
          }
          if (subset.length) {
            console.log("subset", subset);
            addToSet(subset);
            addToSet([plate, ...subset]);
          }
        });
      }
    });

  const setArray = Array.from(resultSet);
  setArray.sort((a, b) => (a as []).length - (b as []).length);
  return setArray as number[][];
}
