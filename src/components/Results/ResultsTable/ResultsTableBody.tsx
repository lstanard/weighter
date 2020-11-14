import React from "react";

import messages from "../../../constants/messages";
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
        <span className={styles.tableColLabel}>
          {messages.TableColLabelPlates}
        </span>
        {result.plates.map((plate) => (
          <span
            key={`${result.id}-${plate.weight}`}
            className={styles.plateGroup}
          >
            <span className={styles.resultPlateQty}>{plate.quantity}x</span>
            <DisplayWeight weight={plate.weight} displayUnits={false} />
          </span>
        ))}
      </div>
      <div className={styles.tableColBarbell}>
        <span className={styles.tableColLabel}>
          {messages.TableColLabelBarbell}
        </span>
        {result.barbell.name}
      </div>
      <div className={styles.tableColTotal}>
        <span className={styles.tableColLabel}>
          {messages.TableColLabelTotal}
        </span>
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
