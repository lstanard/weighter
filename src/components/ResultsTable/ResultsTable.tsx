/* eslint-disable no-unused-vars */
import React, { ReactElement, useMemo } from "react";

import { Plate, Barbell } from "../../types";

export interface ResultsTableProps {
  plates: Plate[];
  barbells: Barbell[];
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
  plates: number[];
}

/**
 * TODO: Move this into /utils and WRITE TESTS!
 *
 * @param plates
 */
const getPlateCombinations = (plates: number[]): number[][] => {
  const data: number[][] = [];
  const plateCombinations = (arr: number[]): any => {
    arr.map((plate, index, next) => {
      const nextArray = [...next];
      nextArray.splice(index, 1);

      if (!next.length || !nextArray.length) {
        return;
      }

      // add individual plates
      if (!data.find((result) => result.toString() === [plate].toString())) {
        data.push([plate]);
      }

      // add combinations
      const combo = [plate, ...nextArray].sort((a, b) => a - b);
      if (!data.find((result) => result.toString() === combo.toString())) {
        data.push(combo);
      }

      // eslint-disable-next-line consistent-return
      return plateCombinations(nextArray);
    });
  };

  if (plates.length > 1) {
    plateCombinations(plates);
  } else {
    data.push([plates[0]]);
  }
  return data;
};

/**
 * Get the sum of all provided plates, doubled
 *
 * @param plates
 */
const getPlatesTotalWeight = (plates: number[]): number => {
  return plates.reduce((prev, current) => prev + current) * 2;
};

/**
 * Utility for creating a unique id for each result, mainly
 * for the purposes of providing a unique key when rendering.
 *
 * @param totalWeight
 * @param plates
 * @param barbell
 */
const getResultId = (
  totalWeight: number,
  plates: number[],
  barbell: Barbell
): string => {
  return `result-${barbell.id}-${totalWeight}-${plates
    .toString()
    .replace(",", "-")}`;
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
      const plateCombinations: number[][] = getPlateCombinations(
        flattenedPlates
      );

      plateCombinations.forEach((combination) => {
        const totalWeight = getPlatesTotalWeight(combination) + barbell.weight;
        const result = {
          id: getResultId(totalWeight, combination, barbell),
          barbell,
          plates: combination,
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
      <button type="button">Sort by total weight</button>
      <button type="button">Sort by barbell</button>
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
                  {result.plates.map((plate, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <span key={`plate-${plate}-${index}`}>
                      {plate}x2 {index !== result.plates.length - 1 ? "+ " : ""}
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
