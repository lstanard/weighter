import React, { Dispatch, ReactElement, SetStateAction } from "react";

import Plates from "./Plates";
import Barbells from "./Barbells";
import { Barbell, Plate } from "../../types";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import styles from "./EquipmentPanel.module.scss";

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
    <div className={styles.container}>
      <header className={styles.appHeader}>
        <span className={styles.logo}>
          <Logo />
        </span>
      </header>
      <form>
        <Plates plates={plates} updatePlates={updatePlates} />
        <Barbells barbells={barbells} updateBarbells={updateBarbells} />
      </form>
    </div>
  );
};

export default EquipmentPanel;
