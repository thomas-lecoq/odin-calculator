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

function operate(operatorFunc, a, b) {
    return operatorFunc(a, b)
}

export { add, substract, multiply, divide, operate};