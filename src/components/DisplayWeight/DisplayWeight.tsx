import React, { ReactElement } from "react";
import cn from "classnames";

import {
  useGlobalUnitsContext,
  GlobalUnitsContextValues,
} from "../useGlobalUnitsContext";
import { LB } from "../../constants/units";
import { getKilograms } from "../../utils";
import { UnitTypes } from "../../types";

export interface DisplayWeightProps {
  /**
   * The weight in pounds or kilograms
   */
  weight: number;

  /**
   * The unit (LB or KG) the weight was originally created with.
   * Need to know this for converting when changing global settings
   * so we only convert as needed.
   *
   * This SHOULD be required, but I have more work to do.
   */
  weightUnits?: UnitTypes;

  /**
   * Indicates if the units should be shown.
   * When false it will appear as '45' instead of '45 lb'
   */
  displayUnits?: boolean;

  /**
   * Class name to apply to the weight wrapper
   */
  weightClassName?: string;

  /**
   * Class name to apply to the units wrapper
   */
  unitsClassName?: string;
}

function DisplayWeight({
  weight,
  weightUnits,
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
