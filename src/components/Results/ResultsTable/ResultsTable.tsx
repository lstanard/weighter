/* eslint-disable no-return-assign */
import React, { ReactElement, useMemo } from "react";

import { Plates, Barbell, Barbells } from "../../../types";
import {
  getPlateCombinations,
  getPlatesTotalWeight,
  getResultId,
} from "../../../utils";
import DisplayWeight from "../../DisplayWeight";
import ResultsTableHeader from "./ResultsTableHeader";

import styles from "./ResultsTable.module.scss";

export interface ResultPlate {
  quantity: number;
  weight: number;
}

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

/**
 * Utility for performing some additional transformations on the plates data
 * before being ready to be rendered - such as grouping plates of the same
 * weight and determining the total quantity.
 *
 * @param plates
 */
const getResultPlates = (plates: number[]): ResultPlate[] => {
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
};

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
        .filter((plate) => plate.selected)
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
  }, [barbells, plates]);

  /**
   * Sort results
   */
  const sortedResults = useMemo(() => {
    return combinations.sort((a, b) => {
      return a.totalWeight - b.totalWeight;
    });
  }, [combinations]);

  /**
   * Apply any specified search parameters to the sorted results
   */
  const finalResults = useMemo(() => {
    let filteredSearchResults: Result[] = [];

    if (!sortedResults.length) {
      return null;
    }

    if (searchValue) {
      const searchPattern = new RegExp(`^${searchValue}`, "i");
      filteredSearchResults = sortedResults.filter((result) => {
        if (searchVariance) {
          for (
            let i = searchValue - searchVariance;
            i <= Number(searchValue) + Number(searchVariance);
            i += 1
          ) {
            if (i === result.totalWeight) {
              return true;
            }
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

  const tableRows = finalResults?.map((result) => (
    <tr id={result.id} key={result.id} tabIndex={0}>
      <td className={styles.tableColPlates}>
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
      </td>
      <td className={styles.tableColBarbell}>{result.barbell.name}</td>
      <td className={styles.tableColTotal}>
        <DisplayWeight weight={result.totalWeight} />
      </td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      {combinations.length ? (
        <table>
          <ResultsTableHeader />
          <tbody>{tableRows}</tbody>
        </table>
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
