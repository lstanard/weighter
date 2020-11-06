import React, { ReactElement } from "react";
import Select, { ValueType, StylesConfig } from "react-select";

import { Plate } from "../../types";
import { EquipmentPanelProps } from "./EquipmentPanel";

import styles from "./Plates.module.scss";

// NOTE: should make this dynamically generated
const PLATE_QTY_OPTIONS = [
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
  { value: 10, label: "10" },
  { value: 12, label: "12" },
  { value: 14, label: "14" },
  { value: 16, label: "16" },
];

type OptionType = { label: string; value: number };

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

  const handlePlateQtyChange = (value: number, plate: Plate): void => {
    updatePlates(
      plates.map((p: Plate) => {
        if (p.id !== plate.id) {
          return p;
        }
        return {
          ...p,
          quantity: value || 0,
        };
      })
    );
  };

  const customSelectStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      border: 0,
      borderRadius: 3,
      minHeight: 30,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "3px 8px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 0,
      marginTop: 1,
    }),
    placeholder: (provided) => ({
      ...provided,
    }),
  };

  const getDefaultSelectValue = (
    plateQty: number,
    selected: boolean
  ): OptionType | null => {
    const defaultValue = PLATE_QTY_OPTIONS.filter((option) => {
      return option.value === plateQty;
    })[0];
    if (selected) {
      return defaultValue;
    }
    return null;
  };

  const plateOptions = plates.map((plate) => {
    const plateKey = `plate-${plate.id}`;
    return (
      <div key={plateKey} className={styles.plateRow}>
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
        <Select
          id={`${plateKey}-qty`}
          placeholder="Qty."
          onChange={(selectedOption: ValueType<OptionType>): void => {
            const { value } = selectedOption as OptionType;
            handlePlateQtyChange(value, plate);
          }}
          options={PLATE_QTY_OPTIONS}
          className={styles.plateQtySelect}
          styles={customSelectStyles}
          defaultValue={getDefaultSelectValue(plate.quantity, plate.selected)}
          // defaultMenuIsOpen
        />
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3 className={styles.subhead}>Plates</h3>
      </header>
      {plateOptions}
    </div>
  );
};

export default Plates;
