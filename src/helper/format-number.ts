

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
export function formatNumberUSD(argument: number, defaultTo = '') {
  if (!isValidNumber(argument)) {
    return defaultTo;
  }

  // Formatting the number as a string with commas and 2 decimal places
  const formattedNumber = argument.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Returning the formatted number with "USD" appended
  return `USD ${formattedNumber}`;
}

function isValidNumber(value: number): boolean {
  return typeof value === 'number' && !isNaN(value);
}
