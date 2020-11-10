import React, { Dispatch, ReactElement, SetStateAction } from "react";
import cn from "classnames";
import { ASC, DESC, TOTAL_WEIGHT } from "../../../constants/sort";
import { TableSort } from "../../../types";

import tableStyles from "./ResultsTable.module.scss";
import styles from "./ResultsTableHeader.module.scss";

export interface ResultsTableHeaderProps {
  sortOptions: TableSort;
  setSortOptions: Dispatch<SetStateAction<TableSort>>;
}

const ResultsTableHeader = ({
  sortOptions,
  setSortOptions,
}: ResultsTableHeaderProps): ReactElement => {
  return (
    <thead>
      <tr>
        <th className={tableStyles.tableHeaderColPlates}>Plates</th>
        <th className={tableStyles.tableHeaderColBarbell}>Barbell</th>
        <th
          className={cn(
            tableStyles.tableHeaderColTotal,
            styles.tableHeaderColTotal
          )}
        >
          <button
            type="button"
            onClick={(): void => {
              setSortOptions({
                sortColumn: TOTAL_WEIGHT,
                sortOrder: sortOptions.sortOrder === ASC ? DESC : ASC,
              });
            }}
            className={cn(styles.sortHeaderBtn, {
              [styles.sortHeaderBtnDesc]: sortOptions.sortOrder === DESC,
            })}
            aria-label="Sort table by total weight"
          >
            Total Weight
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default ResultsTableHeader;
