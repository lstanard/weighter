import React, { Dispatch, ReactElement, SetStateAction } from "react";
import cn from "classnames";
import { SortAscending, SortDescending } from "phosphor-react";

import { ASC, DESC, TOTAL_WEIGHT } from "../../../constants/sort";
import { TableSort } from "../../../types";

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
    <header className={styles.tableHeader}>
      <div
        className={cn(styles.tableHeaderColPlates, styles.tableHeaderColTitle)}
      >
        Plates
      </div>
      <div
        className={cn(styles.tableHeaderColBarbell, styles.tableHeaderColTitle)}
      >
        Barbell
      </div>
      <div
        className={cn(styles.tableHeaderColTotal, styles.tableHeaderColTitle)}
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
          {sortOptions.sortOrder === ASC ? (
            <SortDescending size={24} className={styles.sortIcon} />
          ) : (
            <SortAscending size={24} className={styles.sortIcon} />
          )}
        </button>
      </div>
    </header>
  );
};

export default ResultsTableHeader;
