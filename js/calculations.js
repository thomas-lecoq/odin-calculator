// logic related to mathematical functions

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function roundIfFloat(value) {
    if (Number.isInteger(value)) return value;
    return Math.round(value * 100) / 100;
}

function operate(operatorFunc, a, b) {
    return roundIfFloat(operatorFunc(a, b));
}

export { add, substract, multiply, divide, operate};