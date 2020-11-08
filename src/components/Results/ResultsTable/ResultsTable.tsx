/* eslint-disable no-return-assign */
import React, { ReactElement, useMemo } from "react";

import { Plates, Barbell, Barbells } from "../../../types";
import {
  getPlateCombinations,
  getPlatesTotalWeight,
  getResultId,
} from "../../../utils";

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
    let results: Result[] = [];

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

    // TODO: will want to move this, both for performance and better code organization
    if (searchValue) {
      if (searchVariance) {
        // console.log("searchRange", searchRange);
      }

      const searchPattern = new RegExp(`^${searchValue}`, "i");
      results = results.filter((result) =>
        searchPattern.test(result.totalWeight.toString())
      );
    }

    // TODO: will want to move this sorting as well
    results.sort((a, b) => {
      return a.totalWeight - b.totalWeight;
    });

    return results;
  }, [barbells, searchValue, plates, searchVariance]);

  const tableRows = combinations.map((result) => (
    <tr id={result.id} key={result.id} tabIndex={0}>
      <td className={styles.tableColPlates}>
        {result.plates.map((plate) => (
          <div
            key={`${result.id}-${plate.weight}`}
            className={styles.resultGroup}
          >
            <span className={styles.resultPlate}>
              <span className={styles.resultPlateQty}>{plate.quantity}x</span>
              {plate.weight}
            </span>
          </div>
        ))}
      </td>
      <td className={styles.tableColBarbell}>{result.barbell.name}</td>
      <td className={styles.tableColTotal}>{result.totalWeight} lb</td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      {combinations.length ? (
        <table>
          <thead>
            <tr>
              <th className={styles.tableHeaderColPlates}>Plates</th>
              <th className={styles.tableHeaderColBarbell}>Barbell</th>
              <th className={styles.tableHeaderColTotal}>Total Weight</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default ResultsTable;
