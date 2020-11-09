import React, { ReactElement } from "react";

import styles from "./UnitToggle.module.scss";

const UnitToggle = (): ReactElement => {
  return (
    <div className={styles.container}>
      <button type="button">Pounds</button>
      <button type="button">Kilograms</button>
    </div>
  );
};

export default UnitToggle;
