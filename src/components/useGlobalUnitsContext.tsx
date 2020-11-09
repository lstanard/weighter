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

export interface GlobalUnitsContext {
  units: UnitTypes;
  setUnits: Dispatch<SetStateAction<UnitTypes>>;
}

export const GlobalUnitsContext = createContext<GlobalUnitsContext>({
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
  const contextValue: GlobalUnitsContext = {
    units,
    setUnits,
  };

  return (
    <GlobalUnitsContext.Provider value={contextValue}>
      {children}
    </GlobalUnitsContext.Provider>
  );
};

export const useGlobalUnitsContext = (): GlobalUnitsContext => {
  return useContext(GlobalUnitsContext);
};
