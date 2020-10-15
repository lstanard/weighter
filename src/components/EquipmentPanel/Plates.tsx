import React, { ReactElement, ChangeEvent } from "react";

import { Plate } from "../../types";
import { EquipmentPanelProps } from "./EquipmentPanel";

import styles from "./Plates.module.scss";

export interface PlatesProps extends EquipmentPanelProps {}

const Plates = ({ plates, updatePlates }: PlatesProps): ReactElement => {
  const handlePlateSelection = (plate: Plate) => {
    updatePlates(
      plates.map((p: Plate) => {
        if (p.weight !== plate.weight) {
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
  ) => {
    updatePlates(
      plates.map((p: Plate) => {
        if (p.weight !== plate.weight) {
          return p;
        }
        return {
          ...p,
          quantity: event.currentTarget.value,
        };
      })
    );
  };

  const plateOptions = plates.map((plate) => {
    const plateKey = `plate-${plate.weight.toString()}`;
    return (
      <p key={plateKey}>
        <input
          id={plateKey}
          type="checkbox"
          checked={plate.selected}
          onChange={() => handlePlateSelection(plate)}
        />
        <label htmlFor={`${plateKey}-qty`}>{plate.weight} lb</label> x&nbsp;
        <input
          id={`${plateKey}-qty`}
          name={`${plateKey}-qty`}
          type="text"
          value={plate.quantity}
          onChange={(event) => handlePlateQtyChange(event, plate)}
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
