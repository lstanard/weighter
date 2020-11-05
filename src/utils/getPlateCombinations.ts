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

  // if a set is too slow i could use an object for faster look ups
  // when checking for duplicates
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

  const createSubsetResults = (
    set: number[],
    plate: number,
    subsetLength: number
  ): void => {
    if (!set.length) {
      return;
    }

    for (let q = 0; q < set.length; q += 1) {
      // add current plate together with each element of set, e.g. [2.5,5]
      addToResults([plate, set[q]]);

      const subset = [...set];
      const splicedValues = subset.splice(0, 1 + q);
      let nextSubset = [];

      if (subset.length) {
        addToResults(subset);
        addToResults([plate, ...subset]);

        // nextSubset contains current subset without first or last values
        nextSubset = [...subset].splice(0, subset.length - 1);
        createSubsetResults(nextSubset, plate, nextSubset.length);
      }
      if (splicedValues.length && splicedValues.length !== subsetLength) {
        // console.log("splicedValues", splicedValues);
        addToResults(splicedValues);
        addToResults([plate, ...splicedValues]);
      }
    }
  };

  plates
    .sort((a, b) => a - b)
    .forEach((plate: number, i: number) => {
      const otherPlates = [...plates];
      otherPlates.splice(i, 1);

      // add individual plate
      addToResults([plate]);
      // add all remaining plates other than current plate
      addToResults(otherPlates);

      // drop every odd-numbered index in otherPlates, then loop over those
      const evenIndexPlates = otherPlates
        .map((otherPlate, p) => ((p + 1) % 2 === 0 ? otherPlate : 0))
        .filter(Boolean);

      if (evenIndexPlates.length > 1) {
        addToResults([plate, ...evenIndexPlates]);
        createSubsetResults(evenIndexPlates, plate, otherPlates.length);
      }

      // drop every even-numbered index in otherPlates, then loop over those
      const oddIndexPlates = otherPlates
        .map((otherPlate, p) => ((p + 1) % 2 === 1 ? otherPlate : 0))
        .filter(Boolean);

      if (oddIndexPlates.length > 1) {
        addToResults([plate, ...oddIndexPlates]);
        createSubsetResults(oddIndexPlates, plate, otherPlates.length);
      }

      // get subsets for remaining plates
      if (otherPlates.length > 1) {
        createSubsetResults(otherPlates, plate, otherPlates.length);
      }
    });

  const setArray = Array.from(resultSet);
  // sort shortest to longest
  setArray.sort((a, b) => (a as []).length - (b as []).length);
  return setArray as number[][];
}
