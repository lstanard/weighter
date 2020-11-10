import { LB, KG } from "./constants/units";
import { ASC, DESC, TOTAL_WEIGHT } from "./constants/sort";

/**
 * Object for defining current sorting options for the results table.
 * Currently can only sort by total combined weight.
 */
export interface TableSort {
  sortColumn: typeof TOTAL_WEIGHT;
  sortOrder: typeof ASC | typeof DESC;
}

/**
 * Possible units of measure
 */
export type UnitTypes = typeof LB | typeof KG;

/**
 * Single Plate entity
 */
export interface Plate {
  /**
   * Unique ID for this plate.
   */
  id: string;

  /**
   * The weight of the plate in pounds.
   */
  weight: number;

  /**
   * Units (pounds or kilograms) the weight was originally provided in.
   * Allows for entering units in a preferred format rather than relying
   * entirely on conversion, which is less precise.
   */
  weightUnits: UnitTypes;

  /**
   * The number of plates available.
   * Allows for empty string because of text input element.
   */
  quantity: number;

  /**
   * Indicates if this plate is selected as available
   */
  selected: boolean;
}

/**
 * Array of plates
 */
export type Plates = Plate[];

/**
 * Single Barbell entity
 */
export interface Barbell {
  /**
   * Unique ID for this barbell.
   */
  id: string;

  /**
   * The weight of the barbell in pounds.
   */
  weight: number;

  /**
   * Name for this barbell.
   */
  name: string;

  /**
   * Indicates if this barbell is selected as available
   */
  selected: boolean;

  /**
   * Length of the barbell in inches.
   */
  length?: number;

  /**
   * An optional text description.
   */
  description?: string;
}

/**
 * Array of plates
 */
export type Barbells = Barbell[];
