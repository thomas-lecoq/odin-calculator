// logic related to keyboard management

import { CALCULATOR_CNTR, SAMPLE_LIBRARY, DIGITS, OPERATORS } from "./config.js";
import { setCurrentEntry, correctCurrentEntry, reset, setOperator, forceOperationResolution, tryToCalculate, checkInfinityOperation} from "./state.js";
import { updateDisplay } from "./display.js";

/**
 * Play a sound from the sample library at its configured starting point.
 * @param {string} sampleKey - Key of the sample in SAMPLE_LIBRARY.
 * @returns {void}
 */
function playSound(sampleKey) {
    const sampleReference = SAMPLE_LIBRARY[sampleKey];
    const sound = sampleReference.sound;
    sound.currentTime = sampleReference.startingPoint;
    sound.play();
}

/**
 * Handle a click on the calculator: play feedback sound, dispatch the typed
 * key to the matching state action, then recompute and refresh the display.
 * @param {MouseEvent} event
 * @returns {void}
 */
function handleKeyPress(event) {
    if (event.target.tagName !== "BUTTON") return;
    const typedKeyValue = event.target.dataset.value;

    // play sound if a button is clicked
    switch(event.target.id) {
        case ("equal-btn"):
            playSound("kaching");
            break;
        default:
            playSound("click");
    };

    // execute appropriate functions depending on clicked button
    switch(true) {
        case (DIGITS.includes(typedKeyValue)):
            setCurrentEntry(typedKeyValue);
            break;
        case (typedKeyValue in OPERATORS):
            setOperator(typedKeyValue);
            break;
        case (typedKeyValue === "equal"):
            forceOperationResolution();
            break;
        case (typedKeyValue === "correct"):
            correctCurrentEntry();
            break;
        case (typedKeyValue === "clear"):
            reset();
            break;
    };
    tryToCalculate();
    checkInfinityOperation();
    updateDisplay();
}

export { handleKeyPress };
