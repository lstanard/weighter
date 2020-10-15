import React, { Dispatch, ReactElement, SetStateAction } from "react";

import Plates from "./Plates";
import Barbells from "./Barbells";
import { Barbell, Plate } from "../../types";

export interface EquipmentPanelProps {
  plates: Plate[];
  barbells: Barbell[];
  updatePlates: Dispatch<SetStateAction<Plate[]>>;
  updateBarbells: Dispatch<SetStateAction<Barbell[]>>;
}

const EquipmentPanel = ({
  plates,
  barbells,
  updatePlates,
  updateBarbells,
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
          <Barbells barbells={barbells} updateBarbells={updateBarbells} />
        </form>
      </section>
    </div>
  );
};

export default EquipmentPanel;
