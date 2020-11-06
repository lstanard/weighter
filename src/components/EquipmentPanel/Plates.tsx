import React, { ReactElement, ChangeEvent } from "react";

import { Plate } from "../../types";
import { EquipmentPanelProps } from "./EquipmentPanel";

import styles from "./Plates.module.scss";

export interface PlatesProps
  extends Pick<EquipmentPanelProps, "plates" | "updatePlates"> {}

const Plates = ({ plates, updatePlates }: PlatesProps): ReactElement => {
  const handlePlateSelection = (plate: Plate): void => {
    updatePlates(
      plates.map((p: Plate) => {
        if (p.id !== plate.id) {
          return p;
        }
        return {
          ...p,
          selected: !plate.selected,
        };
      })
    );
  };

  const handlePlateQtyChange = (
    event: ChangeEvent<HTMLInputElement>,
    plate: Plate
  ): void => {
    updatePlates(
      plates.map((p: Plate) => {
        if (p.id !== plate.id) {
          return p;
        }
        return {
          ...p,
          quantity: event.currentTarget.value
            ? // eslint-disable-next-line radix
              parseInt(event.currentTarget.value)
            : 0,
        };
      })
    );
  };

  const plateOptions = plates.map((plate) => {
    const plateKey = `plate-${plate.id}`;
    return (
      <p key={plateKey} className={styles.plateRow}>
        <input
          id={plateKey}
          type="checkbox"
          checked={plate.selected}
          onChange={(): void => handlePlateSelection(plate)}
          className={styles.plateSelect}
        />
        <label htmlFor={plateKey} className={styles.plateLabel}>
          {plate.weight} lb
        </label>
        <input
          id={`${plateKey}-qty`}
          name={`${plateKey}-qty`}
          type="text"
          value={!plate.quantity ? "" : plate.quantity.toString()}
          onChange={(event): void => handlePlateQtyChange(event, plate)}
          className={styles.plateQtyInput}
        />
      </p>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.subhead}>Plates</h3>
        <span className={styles.subhead}>Qty.</span>
      </header>
      {plateOptions}
    </div>
  );
};

export default Plates;
