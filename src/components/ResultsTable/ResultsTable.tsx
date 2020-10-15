/* eslint-disable no-unused-vars */
import React, { ReactElement } from "react";

import { Plate, Barbell } from "../../types";

export interface ResultsTableProps {
  plates: Plate[];
  barbells: Barbell[];
}

const ResultsTable = ({
  plates,
  barbells,
}: ResultsTableProps): ReactElement => {
  /**
   * Generate all possible combination of plates:
   * - should probably get barbell data in here first
   * - check that number of plates is even, can't add odd number
   * - start from heaviest and move towards lightest
   * - figure out what the data should look like
   *
   * Approach -
   * - Loop through all barbells first, then for each barbell loop through plates
   * - For each barbell need to loop through the plates, reducing as I go
   * - Save to an array of ALL data, not grouped by barbell
   *
   * [
   *   {
   *      totalWeight: 225,
   *      barbell: barbellId,
   *      plates: [{ id: plateId, quantity: 4 }]
   *   }
   * ]
   */

  return <div className="results-table-container">Table</div>;
};

export default ResultsTable;
