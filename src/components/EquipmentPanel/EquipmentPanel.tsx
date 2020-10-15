import React, { Dispatch, ReactElement, SetStateAction } from "react";

import Plates from "./Plates";
import Barbells from "./Barbells";
import { Plate } from "../../types";

export interface EquipmentPanelProps {
  plates: Plate[];
  updatePlates: Dispatch<SetStateAction<Plate[]>>;
}

const EquipmentPanel = ({
  plates,
  updatePlates,
}: EquipmentPanelProps): ReactElement => {
  return (
    <div className="equipment-panel">
      <div className="header">
        <header>
          <h1>weighter</h1>
        </header>
      </div>
      <section>
        <form>
          <Plates plates={plates} updatePlates={updatePlates} />
          <Barbells />
        </form>
      </section>
    </div>
  );
};

export default EquipmentPanel;
