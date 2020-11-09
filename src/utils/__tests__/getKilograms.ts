import getKilograms from "../getKilograms";

describe("getKilograms", () => {
  it("should return correct value", () => {
    expect(getKilograms(45)).toEqual(20.4);
    expect(getKilograms(44)).toEqual(19.9);
    expect(getKilograms(33)).toEqual(15);
    expect(getKilograms(45, 2)).toEqual(20.41);
    expect(getKilograms(33, 2)).toEqual(14.97);
  });
});
