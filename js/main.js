import { add, substract, multiply, divide, operate } from './calculations.js';

let firstNumber;
let secondNumber;
let operator;

console.log(operate(add, 100, 5));
console.log(operate(substract, 100, 5));
console.log(operate(multiply, 100, 5));
console.log(operate(divide, 100, 5));