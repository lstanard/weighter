import React, { ReactElement } from "react";
import { Barbell } from "../../types";

import { EquipmentPanelProps } from "./EquipmentPanel";
import Checkbox from "../Checkbox";

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
            {barbell.length} inches / {barbell.weight} lb
          </span>
        </label>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.sectionTitle}>Barbells</h3>
      </header>
      <div className={styles.barbellOptions}>{barbellOptions}</div>
      <button type="button" onClick={() => console.log("add barbell")}>
        Add
      </button>
    </div>
  );
};

export default Barbells;
