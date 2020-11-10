import React, { ReactElement } from "react";
import cn from "classnames";

import {
  useGlobalUnitsContext,
  GlobalUnitsContextValues,
} from "../useGlobalUnitsContext";
import { LB } from "../../constants/units";
import { getKilograms } from "../../utils";

export interface DisplayWeightProps {
  weight: number;
  displayUnits?: boolean;
  weightClassName?: string;
  unitsClassName?: string;
}

function DisplayWeight({
  weight,
  displayUnits = true,
  weightClassName,
  unitsClassName,
}: DisplayWeightProps): ReactElement {
  const { units }: GlobalUnitsContextValues = useGlobalUnitsContext();
  const displayWeight = units === LB ? weight : getKilograms(weight);

  return (
    <>
      <span className={cn(weightClassName)}>{displayWeight}</span>{" "}
      {displayUnits && <span className={cn(unitsClassName)}>{units}</span>}
    </>
  );
}

export default DisplayWeight;
