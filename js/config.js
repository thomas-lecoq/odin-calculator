// SCREAMING_CASE const and all related configuration elements.

// ids name
const CALCULATOR_CTNR_ID = "calculator-ctnr"

// html elements
const CALCULATOR_CNTR = document.querySelector(`#${CALCULATOR_CTNR_ID}`);

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
}

export { CALCULATOR_CNTR, SAMPLE_LIBRARY };