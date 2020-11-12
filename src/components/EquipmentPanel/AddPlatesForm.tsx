import React from "react";
import cn from "classnames";

import Button, { BTN_THEME_SECONDARY } from "../Button";
import styles from "./AddPlates.module.scss";

export interface AddPlatesFormProps {
  visible: boolean;
  handleAddPlate: () => void;
}

const AddPlatesForm = ({ visible, handleAddPlate }: AddPlatesFormProps) => {
  return (
    <div
      className={cn(styles.addPlatesForm, {
        [styles.visible]: visible,
      })}
    >
      <label htmlFor="add-plate-weight">Weight</label>
      <input type="text" id="add-plate-weight" placeholder="Weight" />
      <label htmlFor="add-plate-qty">Quantity</label>
      <input type="text" id="add-plate-qty" placeholder="Qty." />
      <Button
        id="add-plates-btn"
        label="Add"
        value="+"
        onClick={(): void => handleAddPlate()}
        theme={BTN_THEME_SECONDARY}
        className={styles.addPlatesBtn}
      />
    </div>
  );
};

export default AddPlatesForm;
