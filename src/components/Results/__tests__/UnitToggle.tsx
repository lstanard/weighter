import React from "react";
import { render, fireEvent } from "@testing-library/react";

import UnitToggle from "../UnitToggle";

import styles from "../UnitToggle.module.scss";

describe("UnitToggle", () => {
  it("should render correctly", () => {
    const { getByText, container } = render(<UnitToggle />);
    expect(getByText("Pounds")).not.toBeNull();
    expect(getByText("Kilograms")).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it("should select pounds by default", () => {
    const { container } = render(<UnitToggle />);
    const buttons = container.querySelectorAll("button");
    expect(buttons[0].classList).toContain(styles.selected);
    expect(buttons[1].classList).not.toContain(styles.selected);
  });

  // TODO: not sure how to get this test working with useGlobalUnitsContext
  it.skip("should correctly toggle selection", () => {
    const { container, debug } = render(<UnitToggle />);
    const buttons = container.querySelectorAll("button");
    fireEvent.click(buttons[1]);
    debug();
    expect(container).toMatchSnapshot();
  });
});
