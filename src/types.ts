/**
 * Single Plate entity
 */
export interface Plate {
  /**
   * The weight of the plate in pounds.
   */
  weight: number;

  /**
   * The number of plates available.
   * Allows for strings because of text input element.
   */
  quantity: string | number;

  /**
   * Indicates if this plate is selected as available
   */
  selected: boolean;
}
