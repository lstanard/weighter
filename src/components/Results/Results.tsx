import React, { ReactElement, useCallback } from "react";

import { Plates, Barbells } from "../../types";
import ResultsTable from "./ResultsTable";

import styles from "./Results.module.scss";

export interface ResultsProps {
  plates: Plates;
  barbells: Barbells;
}

function Results({ plates, barbells }: ResultsProps): ReactElement {
  const handleFind = useCallback((event) => {
    console.log(event.currentTarget.value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.resultsHeader}>
        <input type="text" placeholder="Find weight" onChange={handleFind} />
      </div>
      <ResultsTable plates={plates} barbells={barbells} />
    </div>
  );
}

export default Results;
