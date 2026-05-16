// SCREAMING_CASE const and all related configuration elements.
import { add, substract, multiply, divide } from './calculations.js'

// ids name
const CALCULATOR_CTNR_ID = "calculator-ctnr";
const SCREEN_DISPLAY_ID = "screen-display";

// html elements
const CALCULATOR_CNTR = document.querySelector(`#${CALCULATOR_CTNR_ID}`);
const DISPLAY_TEXT = document.querySelector(`#${SCREEN_DISPLAY_ID} p`);

// sounds
const SAMPLE_LIBRARY = {
    "click": {
        "sound": new Audio("sounds/click.mp3"), 
        "startingPoint": 0.07,
    },
    "kaching": {
        "sound": new Audio("sounds/kaching.mp3"),
        "startingPoint": 0,
    },
};

// arrays
const DIGITS = Array.from({ length: 10 }, (_, i) => String(i));
DIGITS.push('.');

// Object
const OPERATORS = {
    "add": {
        "value": add,
        "text": "+"
    },
    "substract": {
        "value": substract,
        "text": "-"
    }, 
    "multiply": {
        "value": multiply,
        "text": "x"
    }, 
    "divide": {
        "value": divide,
        "text": "÷"
    },
};

// calculation state
const INITIAL_STATE = {
    "currentEntry": {
        "value": null,
        "text": "",
    },
    "firstMember": {
        "value": null,
        "text": "",
    },
    "secondMember": {
        "value": null,
        "text": "",
    },
    "operator": {
        "value": null,
        "text": "",
    },
    "operation": {
        "text": "",
    },
};

export { CALCULATOR_CNTR, DISPLAY_TEXT, SAMPLE_LIBRARY, DIGITS, OPERATORS, INITIAL_STATE};