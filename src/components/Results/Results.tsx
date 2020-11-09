import React, { ReactElement, useCallback, useState } from "react";

import { Plates, Barbells } from "../../types";
import ResultsTable from "./ResultsTable";
import Find from "./Find";
import UnitToggle from "./UnitToggle";

import styles from "./Results.module.scss";

export interface ResultsProps {
  plates: Plates;
  barbells: Barbells;
}

function Results({ plates, barbells }: ResultsProps): ReactElement {
  const [searchValue, setSearchValue] = useState(0);
  const [searchVariance, setSearchVariance] = useState(5);

  const handleFind = useCallback((event) => {
    const { value } = event.currentTarget;
    // NOTE: start search after 1 or 2 characters?
    // if (value.length < 2) {
    //   setSearchValue("");
    //   return;
    // }
    setSearchValue(value);
  }, []);
  const handleSearchVarianceChange = useCallback((value: number) => {
    setSearchVariance(value);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.resultsHeader}>
        <Find
          onSearchChange={handleFind}
          onSearchVarianceChange={handleSearchVarianceChange}
        />
        <UnitToggle />
      </div>
      <ResultsTable
        plates={plates}
        barbells={barbells}
        searchValue={searchValue}
        searchVariance={searchVariance}
      />
    </div>
  );
}

export default Results;
