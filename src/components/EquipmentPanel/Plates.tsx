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
      <p key={plateKey}>
        <input
          id={plateKey}
          type="checkbox"
          checked={plate.selected}
          onChange={(): void => handlePlateSelection(plate)}
        />
        <label htmlFor={plateKey}>{plate.weight} lb</label> x&nbsp;
        <input
          id={`${plateKey}-qty`}
          name={`${plateKey}-qty`}
          type="text"
          value={!plate.quantity ? "" : plate.quantity.toString()}
          onChange={(event): void => handlePlateQtyChange(event, plate)}
        />
      </p>
    );
  });

  return (
    <div className={styles.container}>
      <header>
        <h3>Plates</h3>
      </header>
      {plateOptions}
    </div>
  );
};

export default Plates;
