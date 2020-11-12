import React, { ReactElement } from "react";
import { Barbell } from "../../types";

import { EquipmentPanelProps } from "./EquipmentPanel";
import Checkbox from "../Checkbox";
import Button from "../Button";
import DisplayWeight from "../DisplayWeight";

import styles from "./Barbells.module.scss";

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
      <div key={barbellKey} className={styles.barbellRow}>
        <Checkbox
          id={barbellKey}
          defaultChecked={barbell.selected}
          onChange={(): void => handleBarbellSelection(barbell)}
          className={styles.barbellSelect}
        />
        <label htmlFor={barbellKey} className={styles.barbellLabel}>
          <span className={styles.barbellName}>{barbell.name}</span>
          <span className={styles.barbellDesc}>
            {barbell.length} inches /{" "}
            <DisplayWeight
              weight={barbell.weight}
              weightUnits={barbell.weightUnits}
            />
          </span>
        </label>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.sectionTitle}>Barbells</h2>
      </header>
      <div className={styles.barbellOptions}>{barbellOptions}</div>
      <Button
        id="add-barbell-btn"
        label="Add"
        onClick={(): void => console.log("add barbell")}
      />
    </div>
  );
};

export default Barbells;
