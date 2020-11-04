/**
 * Function for retrieving all possible combinations of plates.
 * This function has extremely poor performance and needs to be
 * re-written, probably without recursion.
 *
 * @param plates
 */
export default function getPlateCombinations(plates: number[]): number[][] {
  const data: number[][] = [];
  const plateCombinations = (arr: number[]): any => {
    arr.map((plate, index, next) => {
      const nextArray = [...next];
      nextArray.splice(index, 1);

      if (!next.length || !nextArray.length) {
        return;
      }

      // add individual plates
      if (!data.find((result) => result.toString() === [plate].toString())) {
        data.push([plate]);
      }

      // add combinations
      const combo = [plate, ...nextArray].sort((a, b) => a - b);
      if (!data.find((result) => result.toString() === combo.toString())) {
        data.push(combo);
      }

      // eslint-disable-next-line consistent-return
      return plateCombinations(nextArray);
    });
  };

  if (plates.length > 1) {
    plateCombinations(plates);
  } else {
    data.push([plates[0]]);
  }
  return data;
}
