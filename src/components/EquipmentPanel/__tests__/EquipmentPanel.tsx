/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { render } from "@testing-library/react";

import plateData from "../../../data/plates";
import barbellData from "../../../data/barbells";
import EquipmentPanel from "../EquipmentPanel";

import styles from "../EquipmentPanel.module.scss";

const updatePlates = jest.fn();
const updateBarbells = jest.fn();

const PROPS = {
  plates: plateData,
  barbells: barbellData,
  updatePlates,
  updateBarbells,
};

describe("EquipmentPanel", () => {
  it("should render correctly", () => {
    const { container, getByText } = render(<EquipmentPanel {...PROPS} />);
    expect(container).toMatchSnapshot();
    expect(getByText("Weight Plates")).not.toBeNull();
    expect(getByText("Barbells")).not.toBeNull();
    expect(container.querySelectorAll(`.${styles.plateRow}`).length).toBe(10);
    expect(container.querySelectorAll(`.${styles.barbellRow}`).length).toBe(3);
  });
});
