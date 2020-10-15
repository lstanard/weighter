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
   * The number of plates available.
   * Allows for empty string because of text input element.
   */
  quantity: number | "";

  /**
   * Indicates if this plate is selected as available
   */
  selected: boolean;
}

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
