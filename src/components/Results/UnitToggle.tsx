import React, { ReactElement } from "react";

import { LB, KG } from "../../constants/units";
import {
  useGlobalUnitsContext,
  GlobalUnitsContext,
} from "../useGlobalUnitsContext";

import styles from "./UnitToggle.module.scss";

const UnitToggle = (): ReactElement => {
  const { setUnits }: GlobalUnitsContext = useGlobalUnitsContext();

  return (
    <div className={styles.container}>
      <button type="button" onClick={(): void => setUnits(LB)}>
        Pounds
      </button>
      <button type="button" onClick={(): void => setUnits(KG)}>
        Kilograms
      </button>
    </div>
  );
};

export default UnitToggle;
