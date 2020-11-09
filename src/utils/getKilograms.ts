/**
 * Utility for converting pounds to kilograms
 *
 * @param weight A number representing the weight to be displayed
 * @param decimalPlace Optional number of decimal places to display
 */
export default function getKilograms(
  weight: number,
  decimalPlace: number = 1
): number {
  return Number(
    (Math.round((weight / 2.205) * 100) / 100).toFixed(decimalPlace)
  );
}
