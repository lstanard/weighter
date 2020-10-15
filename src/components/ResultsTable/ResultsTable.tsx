import React, { ReactElement } from "react";

import { Plate } from "../../types";

export interface ResultsTableProps {
  plates: Plate[];
}

// eslint-disable-next-line no-unused-vars
const ResultsTable = ({ plates }: ResultsTableProps): ReactElement => {
  /**
   * Generate all possible combination of plates:
   * - should probably get barbell data in here first
   * - check that number of plates is even, can't add odd number
   * - start from heaviest and move towards lightest
   * - figure out what the data should look like
   */

  return <div className="results-table-container">Table</div>;
};

export default ResultsTable;
