import React, { ReactElement } from "react";
import cn from "classnames";

import { LB, KG } from "../../constants/units";
import {
  useGlobalUnitsContext,
  GlobalUnitsContextValues,
} from "../useGlobalUnitsContext";

import styles from "./UnitToggle.module.scss";

export interface UnitToggleProps {
  className?: string;
}

const UnitToggle = ({ className }: UnitToggleProps): ReactElement => {
  const { units, setUnits }: GlobalUnitsContextValues = useGlobalUnitsContext();

  return (
    <div className={cn(styles.container, className)}>
      <button
        type="button"
        onClick={(): void => setUnits(LB)}
        className={cn({
          [styles.selected]: units === LB,
        })}
      >
        Pounds
      </button>
      <button
        type="button"
        onClick={(): void => setUnits(KG)}
        className={cn({
          [styles.selected]: units === KG,
        })}
      >
        Kilograms
      </button>
    </div>
  );
};

export default UnitToggle;
