/**
 * Returns a greeting message for the given name.
 *
 * @param {string} name - The name to greet.
 * @returns {string} Greeting message.
 */
function sayHello(name) {
  return `Hello, ${name}!`;
}

/**
 * Computes a simple spectrum by doubling each number in the input array.
 * This is a placeholder function for the real spectrum calculation.
 *
 * @param {number[]} signal - Array of numbers representing the signal.
 * @returns {number[]} New array with each value doubled.
 */
function computeSpectrum(signal) {
  return signal.map((x) => x * 2);
}

// Export all functions as named exports.
export { sayHello, computeSpectrum };
