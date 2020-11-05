import getPlateCombinations from "../getPlateCombinations";

/**
 * Testing utility for getting a breakdown of total number of
 * occurrences of the length of each result set.
 *
 * https://stattrek.com/online-calculator/combinations-permutations.aspx
 *
 * @param results A results set
 */
const getResultLengths = (results: number[][]): Record<string, number> => {
  const lengthTable: Record<string, number> = {};

  results.forEach((result) => {
    const resultLength = result.length;

    if (!lengthTable[resultLength]) {
      lengthTable[resultLength] = 1;
    } else {
      lengthTable[resultLength] += 1;
    }
  });

  return lengthTable;
};

/**
 * Get the total number of expected results.
 *
 * @param combinations Results from getResultLengths
 */
const getTotalExpected = (combinations: Record<string, number>): number => {
  return Object.values(combinations).reduce(
    (acc: number, current: number) => acc + current
  );
};

describe("getPlateCombinations", () => {
  it("should correctly return null", () => {
    expect(getPlateCombinations([])).toEqual([]);
  });

  it("should correctly return a single plate", () => {
    const input = [25];
    expect(getPlateCombinations(input)).toEqual([[25]]);
  });

  describe("should return all possible combinations", () => {
    it("should return correct results for 2 plates", () => {
      const input = [45, 25];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(3);
      expect(result).toEqual([[25], [45], [25, 45]]);
    });

    it("should return correct results for 3 plates", () => {
      const input = [45, 25, 10];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(7);
      expect(result).toEqual([
        [10],
        [45],
        [25],
        [25, 45],
        [10, 45],
        [10, 25],
        [10, 25, 45],
      ]);
    });

    it("should return correct results for 4 plates", () => {
      const input = [45, 25, 10, 5];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(15);
      // expect(result).toEqual([
      //   [5],
      //   [10],
      //   [25],
      //   [45],
      //   [25, 45],
      //   [5, 10],
      //   [5, 25],
      //   [10, 25],
      //   [5, 45],
      //   [10, 45],
      //   [5, 10, 25],
      //   [5, 10, 45],
      //   [5, 25, 45],
      //   [10, 25, 45],
      //   [5, 10, 25, 45],
      // ]);
    });

    it("should return correct results for 4 plates, with duplicates", () => {
      const input = [45, 25, 5, 5];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(11);
      // expect(result).toEqual([
      //   [45, 25, 5, 5],
      //   [45],
      //   [25, 5, 5],
      //   [5, 5],
      //   [25, 5],
      //   [25],
      //   [45, 5, 5],
      //   [45, 5],
      //   [5],
      //   [45, 25, 5],
      //   [45, 25],
      // ]);
    });

    /**
     * Current benchmarks to beat
     */
    // ✓ should return correct number of results for 5 plates (3ms)
    // ✓ should return correct number of results for 6 plates (20ms)
    // ✓ should return correct number of results for 7 plates (281ms)

    // ✓ should return correct number of results for 5 plates (3ms)
    // ✓ should return correct number of results for 6 plates (22ms)
    // ✓ should return correct number of results for 7 plates (318ms)

    // ✓ should return correct number of results for 5 plates (2ms)
    // ✓ should return correct number of results for 6 plates (20ms)
    // ✓ should return correct number of results for 7 plates (290ms)
    // ✓ should return correct number of results for 8 plates (3888ms)

    it("should return correct number of results for 5 plates", () => {
      const input = [45, 25, 10, 5, 2.5];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(31);
    });

    it("should return correct number of results for 6 plates", () => {
      const input = [55, 45, 25, 10, 5, 2.5];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(63);
    });

    it.only("should return correct number of results for 7 plates", () => {
      const input = [55, 45, 35, 25, 10, 5, 2.5];
      const expectedCombinationLengths = {
        "1": 7,
        "2": 21,
        "3": 35,
        "4": 35,
        "5": 21,
        "6": 7,
        "7": 1,
      };
      const result = getPlateCombinations(input);
      const resultCombinationLengths = getResultLengths(result);
      expect(resultCombinationLengths).toEqual(expectedCombinationLengths);
      const expectedTotalCombinations = getTotalExpected(
        expectedCombinationLengths
      );
      expect(result.length).toEqual(expectedTotalCombinations); // 127
    });

    it("should return correct number of results for 8 plates", () => {
      const input = [55, 45, 35, 25, 10, 5, 2.5, 1.25];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(255);
    });

    it("should return correct number of results for 9 plates", () => {
      const input = [100, 55, 45, 35, 25, 10, 5, 2.5, 1.25];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(511);
    });
  });
});
