import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";

import { UnitTypes } from "../types";
import { LB } from "../constants/units";

const defaultUnits = LB;

export interface GlobalUnitsContextValues {
  units: UnitTypes;
  setUnits: Dispatch<SetStateAction<UnitTypes>>;
}

export const GlobalUnitsContext = createContext<GlobalUnitsContextValues>({
  units: defaultUnits,
  setUnits: () => null,
});

export interface GlobalUnitsContextProviderProps {
  children: ReactElement;
}

export const GlobalUnitsContextProvider = ({
  children,
}: GlobalUnitsContextProviderProps): ReactElement => {
  const [units, setUnits] = useState<UnitTypes>(defaultUnits);
  const contextValue: GlobalUnitsContextValues = {
    units,
    setUnits,
  };

  return (
    <GlobalUnitsContext.Provider value={contextValue}>
      {children}
    </GlobalUnitsContext.Provider>
  );
};

export const useGlobalUnitsContext = (): GlobalUnitsContextValues => {
  return useContext(GlobalUnitsContext);
};
