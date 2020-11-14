import React, { ReactElement, useState } from "react";

import { Plate, Barbell } from "../types";
import barbellData from "../data/barbells";
import plateData from "../data/plates";
import { GlobalUnitsContextProvider } from "./useGlobalUnitsContext";
import EquipmentPanel from "./EquipmentPanel/EquipmentPanel";
import Results from "./Results";

function App(): ReactElement {
  const [barbells, setBarbells] = useState<Barbell[]>(barbellData);
  const [plates, setPlates] = useState<Plate[]>(plateData);

  return (
    <GlobalUnitsContextProvider>
      <div className="main">
        <div className="drawer">
          <EquipmentPanel
            plates={plates}
            barbells={barbells}
            updatePlates={setPlates}
            updateBarbells={setBarbells}
          />
        </div>
        <Results plates={plates} barbells={barbells} />
      </div>
    </GlobalUnitsContextProvider>
  );
}

export default App;
