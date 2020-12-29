/**
 * Returns the modulo of two given numbers
 * This differs from the remainder operator (%) for negative dividends
 *
 * @param x Dividend
 * @param y Divider
 *
 * @return Modulo of the two numbers
 */
const modulo = (x: number, y: number): number => ((x % y) + y) % y;

/**
 * Get a random value in a range around a start point
 *
 * @param x     Start point
 * @param range Random range (-range, range)
 *
 * @return Random value in range around x
 */
const randomAround = (x: number, range: number): number =>
  x + Math.floor(Math.random() * (range * 2)) - range;

/**
 * Create an array from a given range
 *
 * @param start First value of range (inclusive)
 * @param stop  Last value of range (exclusive)
 * @param step  Step between consecutive range values
 *
 * @return Array range
 */
const range = (start = 1, stop: number, step = 1): number[] => {
  const nums: number[] = [];

  for (let i = start; i < stop; i += step) {
    nums.push(i);
  }

  return nums;
};

/**
 * Create a (randomly) shuffled array from a given range
 *
 * @param start First value of range (inclusive)
 * @param stop  Last value of range (exclusive)
 * @param step  Step between consecutive range values
 *
 * @return Shuffled array range
 */
const shuffledRange = (start = 1, stop: number, step = 1): number[] => {
  const nums: number[] = [];

  for (let i = 0; i < (stop - start) / step; i++) {
    const j = Math.floor(Math.random() * (i + 1));

    if (j !== i) {
      nums.push(nums[j]);
    }

    nums[j] = start + i * step;
  }

  return nums;
};

export { modulo, randomAround, range, shuffledRange };
