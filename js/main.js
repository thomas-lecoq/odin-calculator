import { add, substract, multiply, divide, operate } from './calculations.js';
import { getTypedKeyValue, playKeypressFeedback } from './keyboard.js';

let firstNumber;
let secondNumber;
let operator;

getTypedKeyValue();
playKeypressFeedback();