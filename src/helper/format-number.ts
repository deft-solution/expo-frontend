import { KHR_RATE } from '@/constants/Currency';

/**
 * Formats a given number with commas as thousands separators and ensures two decimal places.
 * If the argument is not a valid number, it returns a default value.
 *
 * @param {number} argument - The number to format.
 * @param {string} [defaultTo=''] - The default value to return if the input is not a valid number.
 * @returns {string} The formatted number with commas and two decimal places, or the default value.
 *
 * @example
 * formatNumber(1234567.5); // "1,234,567.50"
 * formatNumber(NaN, 'N/A'); // "N/A"
 */
export function formatNumber(argument: number, defaultTo = '') {
  if (!isValidNumber(argument)) {
    return defaultTo;
  }

  return argument.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Converts a given number to KHR currency by multiplying by 4000, formats it with commas as
 * thousands separators, and ensures two decimal places. Returns a default value if the input is invalid.
 *
 * @param {number} argument - The number to convert and format.
 * @param {string} [defaultTo=''] - The default value to return if the input is not a valid number.
 * @returns {string} The formatted number with commas, two decimal places, and "KHR" currency notation.
 *
 * @example
 * formatNumberKHR(123.5); // "492,000.00 KHR"
 * formatNumberKHR(NaN, 'N/A'); // "N/A"
 */
export function formatNumberKHR(argument: number, defaultTo = '') {
  if (!isValidNumber(argument)) {
    return defaultTo;
  }

  const convertedValue = argument * KHR_RATE;
  return `${convertedValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function isValidNumber(value: number): boolean {
  return typeof value === 'number' && !isNaN(value);
}
