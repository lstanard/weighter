import React, { useState } from "react";

import "./App.css";
import EquipmentPanel from "./components/EquipmentPanel/EquipmentPanel";
import { Plate } from "./types";

function App() {
  const [plates, setPlates] = useState<Plate[]>([
    {
      weight: 55,
      quantity: 2,
      selected: true,
    },
    {
      weight: 45,
      quantity: 2,
      selected: true,
    },
    {
      weight: 35,
      quantity: 2,
      selected: true,
    },
    {
      weight: 25,
      quantity: 2,
      selected: true,
    },
    {
      weight: 15,
      quantity: 2,
      selected: true,
    },
    {
      weight: 10,
      quantity: 2,
      selected: true,
    },
    {
      weight: 5,
      quantity: 2,
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
    <div className="app">
      <h1>Weighter</h1>
      <div className="main">
        <EquipmentPanel plates={plates} updatePlates={setPlates} />
      </div>
    </div>
  );
}

export default App;
