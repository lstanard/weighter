import React from "react";
import { Plus } from "phosphor-react";
import cn from "classnames";

import styles from "./AddPlatesForm.module.scss";

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
      <button
        id="add-plates-btn"
        aria-label="Add plates"
        onClick={(): void => handleAddPlate()}
        className={styles.addPlatesBtn}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default AddPlatesForm;
