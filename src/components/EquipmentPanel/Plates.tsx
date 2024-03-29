/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useCallback, useState } from "react";
import { Trash } from "phosphor-react";
import cn from "classnames";
import Select, { ValueType, StylesConfig } from "react-select";
import { v4 as uuidv4 } from "uuid";

import { Plate } from "../../types";
import { EquipmentPanelProps } from "./EquipmentPanel";
import Checkbox from "../Checkbox";
import Button from "../Button";
import DisplayWeight from "../DisplayWeight";
import styles from "./Plates.module.scss";
import AddPlatesForm from "./AddPlatesForm";
import {
  useGlobalUnitsContext,
  GlobalUnitsContextValues,
} from "../useGlobalUnitsContext";

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
  const { units }: GlobalUnitsContextValues = useGlobalUnitsContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleCustomizePlates = useCallback(() => {
    // Open a dialog? Not sure what I want to do here.
    // Or it could take this current component and add some options?
    // Might actually want to mock something up in Adobe XD first.

    setIsEditing(!isEditing);
  }, [isEditing]);

  /**
   * Toggle plate selection
   *
   * @param plate
   */
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

  /**
   * Update plate quantity
   *
   * @param value
   * @param plate
   */
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

  /**
   * Remove plate
   *
   * @param plate
   */
  const handleRemovePlate = (plate: Plate): void => {
    updatePlates(
      plates.filter((p: Plate) => {
        return p.id !== plate.id;
      })
    );
  };

  /**
   * Add a new set of plates
   */
  const handleAddPlate = (): void => {
    const addPlateWeight = document.getElementById(
      "add-plate-weight"
    ) as HTMLInputElement;
    const addPlateQty = document.getElementById(
      "add-plate-qty"
    ) as HTMLInputElement;

    const weight = addPlateWeight?.value;
    const quantity = addPlateQty?.value;

    if (!weight || !quantity) {
      return;
    }

    const newPlate: Plate = {
      id: uuidv4(),
      weight: Number(addPlateWeight?.value),
      weightUnits: units,
      quantity: Number(addPlateQty?.value),
      selected: true,
    };
    updatePlates([...plates, newPlate]);

    addPlateWeight.value = "";
    addPlateQty.value = "";
  };

  const getSelectValue = useCallback((plateQty: number, selected: boolean) => {
    const defaultValue = PLATE_QTY_OPTIONS.filter((option) => {
      return option.value === plateQty;
    })[0];
    if (selected && defaultValue) {
      return defaultValue;
    }
    return null;
  }, []);

  /**
   * This should really be its own component.
   */
  const plateOptions = plates
    .filter((plate) => plate.weight !== 0)
    .sort((a, b) => a.weight - b.weight)
    .map((plate) => {
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
              weightUnits={plate.weightUnits}
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
              value={getSelectValue(plate.quantity, plate.selected)}
              aria-labelledby={`label-${plateKey}`}
            />
          </span>
          <button
            type="button"
            onClick={(): void => handleRemovePlate(plate)}
            aria-label="Remove"
            className={cn(styles.plateRemoveBtn, {
              [styles.visible]: isEditing,
            })}
          >
            <Trash size={20} />
          </button>
        </div>
      );
    });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.sectionTitle}>Weight Plates</h2>
        {/* Add toggle to be able to collapse sections 
            (reusable collapsible section component) */}
      </header>
      <div className={styles.plateOptions}>{plateOptions}</div>
      <AddPlatesForm visible={isEditing} handleAddPlate={handleAddPlate} />
      <Button
        id="customize-plates-btn"
        label={!isEditing ? "Customize" : "Done"}
        onClick={handleCustomizePlates}
      />
    </div>
  );
};

export default Plates;
