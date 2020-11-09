/**
 * Utility for converting pounds to kilograms
 *
 * TODO: I need to improve this function. Ideally 44 pounds would
 * convert to 20 kilograms, even if that's not 100% precise.
 * Want to change `decimalPlace` arg to `precision`.
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
