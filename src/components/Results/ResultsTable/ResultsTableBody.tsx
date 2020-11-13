import React from "react";

import DisplayWeight from "../../DisplayWeight";
import { Result } from "./ResultsTable";

import styles from "./ResultsTableBody.module.scss";

export interface ResultsTableBodyProps {
  tableResults: Result[];
}

const ResultsTableBody = ({ tableResults }: ResultsTableBodyProps) => {
  const tableRows = tableResults?.map((result) => (
    <div
      id={result.id}
      key={result.id}
      tabIndex={0}
      className={styles.tableRow}
    >
      <div className={styles.tableColPlates}>
        {result.plates.map((plate) => (
          <div
            key={`${result.id}-${plate.weight}`}
            className={styles.resultGroup}
          >
            <span className={styles.resultPlate}>
              <span className={styles.resultPlateQty}>{plate.quantity}x</span>
              <DisplayWeight weight={plate.weight} displayUnits={false} />
            </span>
          </div>
        ))}
      </div>
      <div className={styles.tableColBarbell}>{result.barbell.name}</div>
      <div className={styles.tableColTotal}>
        <DisplayWeight
          weight={result.totalWeight}
          weightClassName={styles.totalWeightAmt}
        />
      </div>
    </div>
  ));
  return <div className={styles.tableBody}>{tableRows}</div>;
};

export default ResultsTableBody;
