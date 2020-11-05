import React, { ReactElement, useMemo } from "react";

import { Plate, Barbell } from "../../types";
import {
  getPlateCombinations,
  getPlatesTotalWeight,
  getResultId,
} from "../../utils";

export interface ResultsTableProps {
  plates: Plate[];
  barbells: Barbell[];
}

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
  plates: ResultPlates;
}

/**
 * Utility for performing some additional transformations on the plates data
 * before being ready to be rendered - such as grouping plates of the same
 * weight and determining the total quantity.
 *
 * @param plates
 */
const getResultPlates = (plates: number[]): any => {
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
  return result;
};

const ResultsTable = ({
  plates,
  barbells,
}: ResultsTableProps): ReactElement => {
  const combinations = useMemo(() => {
    const results: Result[] = [];
    barbells.forEach((barbell) => {
      if (!barbell.selected) {
        return;
      }

      const flattenedPlates: number[] = [];
      plates
        .filter((plate) => plate.selected)
        .forEach((plate) => {
          const pairs = plate.quantity ? Math.floor(plate.quantity / 2) : 1;
          for (let i = 0; i < pairs; i += 1) {
            flattenedPlates.push(plate.weight);
          }
        });
      const plateCombinations: number[][] | null = getPlateCombinations(
        flattenedPlates
      );

      if (!plateCombinations) {
        return;
      }

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

    results.sort((a, b) => {
      return a.totalWeight - b.totalWeight;
    });

    return results;
  }, [plates, barbells]);

  return (
    <div className="results-table-container">
      {combinations.length ? (
        <table>
          <thead>
            <tr>
              <th>
                Plates
                <br />
                <small>total # of plates to use</small>
              </th>
              <th>Barbell</th>
              <th>
                Total Weight
                <br />
                <small>including barbell</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {combinations.map((result) => (
              <tr key={result.id}>
                <td>
                  {Object.values(result.plates).map((plate, index) => (
                    <span key={`${result.id}-${plate.weight}`}>
                      {plate.weight}x{plate.quantity}{" "}
                      {index !== Object.values(result.plates).length - 1
                        ? "+ "
                        : ""}
                    </span>
                  ))}
                </td>
                <td>{result.barbell.name}</td>
                <td>{result.totalWeight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
};

export default ResultsTable;
