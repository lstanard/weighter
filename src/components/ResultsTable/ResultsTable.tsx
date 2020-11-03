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
 *
 * @param plates
 */
const getPlatesTotalWeight = (plates: number[]): number => {
  return plates.reduce((prev, current) => prev + current) * 2;
};

/**
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

      /**
       * TODO: This doesn't yet account for plate quantites (treats all as just 2 of each)
       */
      const availablePlates: Plate[] = plates.filter((plate) => plate.selected);
      const plateCombinations: number[][] = getPlateCombinations(
        availablePlates.map((plate) => plate.weight)
      );

      // eslint-disable-next-line consistent-return
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
      <ul>
        {combinations.length ? (
          combinations.map((combo) => (
            <li key={combo.id}>
              <p>
                <strong>Barbell: </strong>
                {combo.barbell.name}
                <br />
                <strong>Total Weight: </strong>
                {combo.totalWeight}
                <br />
                <strong>Plates: </strong>
                {combo.plates.map((plate, index) => (
                  <span key={`plate-${plate}`}>
                    {plate} x 2 {index !== combo.plates.length - 1 ? "+ " : ""}
                  </span>
                ))}
              </p>
              <hr />
            </li>
          ))
        ) : (
          <p>No results</p>
        )}
      </ul>
    </div>
  );
};

export default ResultsTable;
