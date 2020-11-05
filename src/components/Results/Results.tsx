import React, { ReactElement } from "react";

import { Plates, Barbells } from "../../types";
import ResultsTable from "./ResultsTable";

import styles from "./Results.module.scss";

export interface ResultsProps {
  plates: Plates;
  barbells: Barbells;
}

function Results({ plates, barbells }: ResultsProps): ReactElement {
  return (
    <div className={styles.container}>
      <header>Results header</header>
      <ResultsTable plates={plates} barbells={barbells} />
    </div>
  );
}

export default Results;
