/* eslint-disable no-return-assign */
import React, { ReactElement, useMemo, useState, useCallback } from "react";

import { Plate, Plates, Barbell, Barbells, TableSort } from "../../../types";
import {
  getPlateCombinations,
  getPlatesTotalWeight,
  getResultId,
} from "../../../utils";
import ResultsTableHeader from "./ResultsTableHeader";
import ResultsTableBody from "./ResultsTableBody";

import styles from "./ResultsTable.module.scss";
import { ASC, TOTAL_WEIGHT } from "../../../constants/sort";

export interface ResultPlate extends Pick<Plate, "weight" | "quantity"> {}

export interface ResultPlates {
  [key: string]: ResultPlate;
}

export interface Result {
  /**
   * Unique ID for each result, mostly used as the react key
   */
  id: string;

  /**
   * Total amount of weight, including the barbell.
   */
  totalWeight: number;

  /**
   * The barbell being used.
   */
  barbell: Barbell;

  /**
   * Plate weights and quantities to achieve total weight.
   */
  plates: ResultPlate[];
}

export interface ResultsTableProps {
  plates: Plates;
  barbells: Barbells;
  searchValue: number;
  searchVariance: number;
}

const ResultsTable = ({
  plates,
  barbells,
  searchValue,
  searchVariance,
}: ResultsTableProps): ReactElement => {
  const defaultSortOptions: TableSort = {
    sortColumn: TOTAL_WEIGHT,
    sortOrder: ASC,
  };
  const [sortOptions, setSortOptions] = useState<TableSort>(defaultSortOptions);

  /**
   * Utility for performing some additional transformations on the plates data
   * before being ready to be rendered - such as grouping plates of the same
   * weight and determining the total quantity.
   *
   * @param plates
   */
  const getResultPlates = useCallback((plates: number[]): ResultPlate[] => {
    const result: ResultPlates = {};
    plates.forEach((plate) => {
      if (!(plate in result)) {
        result[`${plate}`] = {
          quantity: 2,
          weight: plate,
        };
      } else {
        result[`${plate}`].quantity = result[`${plate}`].quantity + 2;
      }
    });
    return Object.keys(result)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => result[key]);
  }, []);

  /**
   * Creates a result set based on all of the available, selected
   * barbells and plates.
   */
  const combinations = useMemo(() => {
    const results: Result[] = [];

    // Loop over all of the barbells, skipping those that aren't selected.
    barbells.forEach((barbell) => {
      if (!barbell.selected) {
        return;
      }

      const flattenedPlates: number[] = [];

      // Create a flat array of selected plates, with each plate representing
      // a pair, disregarding odd numbers that don't make a complete set since
      // we want to be able to double everything, accounting for both sides of
      // the barbell. e.g., 3x10, 4x5, 2x45 = [45, 10, 5, 5]
      plates
        .filter((plate) => plate.selected && plate.weight !== 0)
        .forEach((plate) => {
          const pairs = plate.quantity ? Math.floor(plate.quantity / 2) : 1;
          for (let i = 0; i < pairs; i += 1) {
            flattenedPlates.push(plate.weight);
          }
        });

      // Get all possible combinations of the provided plates
      const plateCombinations: number[][] | null = getPlateCombinations(
        flattenedPlates
      );

      if (!plateCombinations) {
        return;
      }

      // Create each final Result and push to the results array
      // TODO: need to normalize the weights so there isn't both lbs and kgs
      // being used when creating the totalWeight.
      plateCombinations.forEach((combination) => {
        const totalWeight = getPlatesTotalWeight(combination) + barbell.weight;
        const result = {
          id: getResultId(totalWeight, combination, barbell),
          barbell,
          plates: getResultPlates(combination),
          totalWeight,
        };
        return results.push(result);
      });
    });

    return results;
  }, [barbells, plates, getResultPlates]);

  /**
   * Sort results
   */
  const sortedResults = useMemo(() => {
    return combinations.sort((a, b) => {
      if (sortOptions.sortOrder === ASC) {
        return a.totalWeight - b.totalWeight;
      }

      return b.totalWeight - a.totalWeight;
    });
  }, [combinations, sortOptions.sortOrder]);

  /**
   * Apply any specified search parameters to the sorted results
   */
  const finalResults = useMemo(() => {
    let filteredSearchResults: Result[] = [];

    if (searchValue) {
      const searchPattern = new RegExp(`^${searchValue}`, "i");
      filteredSearchResults = sortedResults.filter((result) => {
        if (searchVariance) {
          const max: number = Number(searchValue) + Number(searchVariance);
          const min: number = Number(searchValue) - Number(searchVariance);
          if (
            result.totalWeight === searchValue ||
            (result.totalWeight >= min && result.totalWeight <= max)
          ) {
            return true;
          }
        } else if (searchPattern.test(result.totalWeight.toString())) {
          return true;
        }
        return false;
      });
    } else {
      return sortedResults;
    }

    if (filteredSearchResults.length) {
      return filteredSearchResults;
    }

    return null;
  }, [searchValue, searchVariance, sortedResults]);

  return (
    <div className={styles.container}>
      {finalResults?.length ? (
        <div className={styles.table}>
          <ResultsTableHeader
            sortOptions={sortOptions}
            setSortOptions={setSortOptions}
          />
          <ResultsTableBody tableResults={finalResults} />
        </div>
      ) : (
        <div className={styles.noResults}>
          <h3>No results</h3>
          <p>
            Make sure you&apos;ve selected some equipment from the menu on the
            left.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
