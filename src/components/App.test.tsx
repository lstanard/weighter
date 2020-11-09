import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render correctly", () => {
    const { getByText } = render(<App />);
    const header = getByText("weighter");
    expect(header).not.toBeNull();
  });

  it.todo("should correctly toggle between pounds and kilograms");
});
