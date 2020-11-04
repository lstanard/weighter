import getPlateCombinations from "../getPlateCombinations";

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
      expect(getPlateCombinations(input)).toEqual([[45], [25, 45], [25]]);
    });

    it("should return correct results for 3 plates", () => {
      const input = [45, 25, 10];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(7);
      expect(result).toEqual([
        [45],
        [10, 25, 45],
        [25],
        [10, 25],
        [10],
        [10, 45],
        [25, 45],
      ]);
    });

    it("should return correct results for 4 plates", () => {
      const input = [45, 25, 10, 5];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(15);
      expect(result).toEqual([
        [45],
        [5, 10, 25, 45],
        [25],
        [5, 10, 25],
        [10],
        [5, 10],
        [5],
        [5, 25],
        [10, 25],
        [5, 10, 45],
        [5, 45],
        [10, 45],
        [5, 25, 45],
        [25, 45],
        [10, 25, 45],
      ]);
    });

    it("should return correct results for 4 plates, with duplicates", () => {
      const input = [45, 25, 5, 5];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(11);
      expect(result).toEqual([
        [45],
        [5, 5, 25, 45],
        [25],
        [5, 5, 25],
        [5],
        [5, 5],
        [5, 25],
        [5, 5, 45],
        [5, 45],
        [5, 25, 45],
        [25, 45],
      ]);
    });

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

    it("should return correct number of results for 7 plates", () => {
      const input = [55, 45, 25, 10, 5, 2.5, 1.25];
      const result = getPlateCombinations(input);
      expect(result.length).toEqual(127);
    });
  });
});
