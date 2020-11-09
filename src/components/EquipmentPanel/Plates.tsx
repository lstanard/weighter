import React, { ReactElement, useCallback } from "react";
import Select, { ValueType, StylesConfig } from "react-select";

import { Plate } from "../../types";
import { EquipmentPanelProps } from "./EquipmentPanel";
import Checkbox from "../Checkbox";
import Button from "../Button";
import DisplayWeight from "../DisplayWeight";

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

const customSelectStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    background: "transparent",
    border: 0,
    borderRadius: 3,
    color: "#fff",
    minHeight: 15,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",
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
    color: "#fff",
    opacity: 0.5,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
};

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

  const getDefaultSelectValue = useCallback(
    (plateQty: number, selected: boolean) => {
      const defaultValue = PLATE_QTY_OPTIONS.filter((option) => {
        return option.value === plateQty;
      })[0];
      if (selected && defaultValue) {
        return defaultValue;
      }
      return null;
    },
    []
  );

  const plateOptions = plates.map((plate) => {
    const plateKey = `plate-${plate.id}`;
    return (
      <div key={plateKey} className={styles.plateRow}>
        <Checkbox
          id={plateKey}
          defaultChecked={plate.selected}
          onChange={(): void => handlePlateSelection(plate)}
          className={styles.plateSelect}
        />
        <label
          id={`label-${plateKey}`}
          htmlFor={plateKey}
          className={styles.plateLabel}
        >
          <DisplayWeight
            weight={plate.weight}
            weightClassName={styles.plateLabelWeight}
            unitsClassName={styles.plateLabelUnits}
          />
        </label>
        <span className={styles.plateQty}>
          <span className={styles.plateQtyTimes}>x</span>
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
            aria-labelledby={`label-${plateKey}`}
          />
        </span>
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.sectionTitle}>Weight Plates</h2>
      </header>
      <div className={styles.plateOptions}>{plateOptions}</div>
      <Button
        id="add-plates-btn"
        label="Add"
        onClick={(): void => console.log("add plates")}
      />
    </div>
  );
};

export default Plates;
