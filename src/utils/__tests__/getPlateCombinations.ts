import getPlateCombinations from "../getPlateCombinations";

describe("getPlateCombinations", () => {
  it("should correctly return a single plate", () => {
    const input = [25];
    expect(getPlateCombinations(input)).toEqual([[25]]);
  });
});
