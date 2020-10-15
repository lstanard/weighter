/**
 * Single Plate entity
 */
export interface Plate {
  /**
   * The weight of the plate in pounds.
   *
   * Assuming weight is a unique number, using as the key.
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
