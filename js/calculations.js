// logic related to mathematical functions

/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
    return a + b
}

/**
 * Subtract b from a.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function substract(a, b) {
    return a - b
}

/**
 * Multiply two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function multiply(a, b) {
    return a * b
}

/**
 * Divide a by b.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function divide(a, b) {
    return a / b
}

/**
 * Round a number to 2 decimals if it's not an integer.
 * @param {number} value
 * @returns {number}
 */
function roundIfFloat(value) {
    if (Number.isInteger(value)) return value;
    return Math.round(value * 100) / 100;
}

/**
 * Apply an operator function to two operands and round the result.
 * @param {(a: number, b: number) => number} operatorFunc
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function operate(operatorFunc, a, b) {
    return roundIfFloat(operatorFunc(a, b));
}

export { add, substract, multiply, divide, operate};