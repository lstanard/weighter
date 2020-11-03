import React, { ReactElement, useState } from "react";

import EquipmentPanel from "./components/EquipmentPanel/EquipmentPanel";
import ResultsTable from "./components/ResultsTable";
import { Plate, Barbell } from "./types";

function App(): ReactElement {
  const [barbells, setBarbells] = useState<Barbell[]>([
    {
      id: "8990ff9d-7c88-4127-92ca-bab3e594c7da",
      weight: 44,
      name: "Olympic",
      selected: false,
      length: 84,
      description: "Standard 7-foot Olympic barbell",
    },
    {
      id: "0d763d30-0927-4f8c-99ce-ece206333cf5",
      weight: 33,
      name: "6-Foot Olympic",
      selected: true,
      length: 72,
      description: "Standard 6-foot womens Olympic barbell",
    },
    {
      id: "9ca1d387-0b7a-4186-9a71-b14eeefb4eb7",
      weight: 17,
      name: "EZ curl",
      selected: true,
      length: 48,
      description: "Standard 4-foot EZ curl bar",
    },
  ]);
  const [plates, setPlates] = useState<Plate[]>([
    {
      id: "750c64fd-9a10-45dc-885c-f089ac3a2258",
      weight: 55,
      quantity: 2,
      selected: false,
    },
    {
      id: "1bf5065e-ee44-4cb2-bf1b-321d0651e9f2",
      weight: 45,
      quantity: 2,
      selected: true,
    },
    {
      id: "9de6b80f-6c8a-458d-ba1a-4e7c126424ed",
      weight: 35,
      quantity: 2,
      selected: false,
    },
    {
      id: "46bc30ec-b357-4c60-9ebb-3ff5bda4f36c",
      weight: 25,
      quantity: 2,
      selected: true,
    },
    {
      id: "29e9209e-c953-4680-b88d-d39f1a57763c",
      weight: 15,
      quantity: 2,
      selected: false,
    },
    {
      id: "028c096b-a080-4934-bf94-8b02e042beb6",
      weight: 10,
      quantity: 3,
      selected: true,
    },
    {
      id: "3787dc6c-3b4f-4052-bf45-22e70ecfbe21",
      weight: 5,
      quantity: 4,
      selected: true,
    },
    {
      id: "7caf0566-5245-428e-b220-ab4c0d852159",
      weight: 2.5,
      quantity: 2,
      selected: true,
    },
    {
      id: "773e8524-09ee-46cc-a2ed-411b2fa27803",
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
        <ResultsTable plates={plates} barbells={barbells} />
      </div>
    </>
  );
}

export default App;
