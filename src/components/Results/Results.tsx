import React, { ReactElement, useCallback, useState } from "react";

import { Plates, Barbells } from "../../types";
import ResultsTable from "./ResultsTable";

import styles from "./Results.module.scss";

export interface ResultsProps {
  plates: Plates;
  barbells: Barbells;
}

function Results({ plates, barbells }: ResultsProps): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const handleFind = useCallback((event) => {
    const { value } = event.currentTarget;
    if (value.length < 2) {
      setSearchValue("");
      return;
    }
    setSearchValue(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.resultsHeader}>
        <input type="text" placeholder="Find weight" onChange={handleFind} />
      </div>
      <ResultsTable
        plates={plates}
        barbells={barbells}
        searchValue={searchValue}
      />
    </div>
  );
}

export default Results;
