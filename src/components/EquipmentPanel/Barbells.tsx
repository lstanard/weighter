import React, { ReactElement } from "react";
import { Barbell } from "../../types";
import { EquipmentPanelProps } from "./EquipmentPanel";

export interface BarbellsProps
  extends Pick<EquipmentPanelProps, "barbells" | "updateBarbells"> {}

const Barbells = ({
  barbells,
  updateBarbells,
}: BarbellsProps): ReactElement => {
  const handleBarbellSelection = (barbell: Barbell): void => {
    updateBarbells(
      barbells.map((b: Barbell) => {
        if (b.id !== barbell.id) {
          return b;
        }
        return {
          ...b,
          selected: !barbell.selected,
        };
      })
    );
  };

  const barbellOptions = barbells.map((barbell) => {
    const barbellKey = `barbell-${barbell.id}`;
    return (
      <p key={barbellKey}>
        <input
          id={barbellKey}
          type="checkbox"
          checked={barbell.selected}
          onChange={(): void => handleBarbellSelection(barbell)}
        />
        <label htmlFor={barbellKey}>
          {barbell.name} <br />(<small>{barbell.description}</small>)
        </label>
      </p>
    );
  });

  return (
    <>
      <header>
        <h3>Barbells</h3>
      </header>
      {barbellOptions}
    </>
  );
};

export default Barbells;
