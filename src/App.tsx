import React, { ReactElement, useState } from "react";

import EquipmentPanel from "./components/EquipmentPanel/EquipmentPanel";
import ResultsTable from "./components/ResultsTable";
import { Plate, Barbell } from "./types";

function App(): ReactElement {
  const [barbells, setBarbells] = useState<Barbell[]>([
    {
      weight: 17,
      name: "EZ curl",
      selected: true,
      length: 48,
      description: "Standard 4-foot long EZ curl bar",
    },
    {
      weight: 33,
      name: "6-Foot Olympic",
      selected: true,
      length: 72,
      description: "Standard 6-foot women's Olympic barbell",
    },
    {
      weight: 44,
      name: "Olympic",
      selected: false,
      length: 84,
      description: "Standard 7-foot Olympic barbell",
    },
  ]);
  const [plates, setPlates] = useState<Plate[]>([
    {
      weight: 55,
      quantity: 2,
      selected: false,
    },
    {
      weight: 45,
      quantity: 2,
      selected: true,
    },
    {
      weight: 35,
      quantity: 2,
      selected: false,
    },
    {
      weight: 25,
      quantity: 2,
      selected: true,
    },
    {
      weight: 15,
      quantity: 2,
      selected: false,
    },
    {
      weight: 10,
      quantity: 2,
      selected: true,
    },
    {
      weight: 5,
      quantity: 4,
      selected: true,
    },
    {
      weight: 2.5,
      quantity: 2,
      selected: true,
    },
    {
      weight: 1.25,
      quantity: 2,
      selected: true,
    },
  ]);

  return (
    <>
      <div className="main">
        <EquipmentPanel
          plates={plates}
          barbells={barbells}
          updatePlates={setPlates}
          updateBarbells={setBarbells}
        />
        <ResultsTable plates={plates} />
      </div>
    </>
  );
}

export default App;
