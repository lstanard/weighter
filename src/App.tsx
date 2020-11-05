import React, { ReactElement, useState } from "react";

import EquipmentPanel from "./components/EquipmentPanel/EquipmentPanel";
import Results from "./components/Results";
import { Plate, Barbell } from "./types";

import barbellData from "./data/barbells";
import plateData from "./data/plates";

function App(): ReactElement {
  const [barbells, setBarbells] = useState<Barbell[]>(barbellData);
  const [plates, setPlates] = useState<Plate[]>(plateData);

  return (
    <>
      <div className="main">
        <EquipmentPanel
          plates={plates}
          barbells={barbells}
          updatePlates={setPlates}
          updateBarbells={setBarbells}
        />
        <Results plates={plates} barbells={barbells} />
      </div>
    </>
  );
}

export default App;
