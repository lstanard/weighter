import React, { ReactElement } from "react";

import styles from "./ResultsTable.module.scss";

const ResultsTableHeader = (): ReactElement => {
  return (
    <thead>
      <tr>
        <th className={styles.tableHeaderColPlates}>Plates</th>
        <th className={styles.tableHeaderColBarbell}>Barbell</th>
        <th className={styles.tableHeaderColTotal}>Total Weight</th>
      </tr>
    </thead>
  );
};

export default ResultsTableHeader;
